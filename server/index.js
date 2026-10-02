import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleApiRequest } from './api.js';
import { connectDB } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

// Load environment variables from .env if present
function loadEnvFile() {
  const envPath = path.resolve(rootDir, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const equalsIdx = trimmed.indexOf('=');
      if (equalsIdx !== -1) {
        const key = trimmed.substring(0, equalsIdx).trim();
        let val = trimmed.substring(equalsIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnvFile();

const PORT = parseInt(process.env.PORT || '3000', 10);
const distDir = path.resolve(rootDir, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

async function startServer() {
  // Connect to MongoDB if URI is provided
  if (process.env.MONGODB_URI) {
    try {
      await connectDB(process.env.MONGODB_URI);
    } catch (err) {
      console.warn('[Server Startup Warning] MongoDB connection failed:', err.message);
    }
  } else {
    console.warn('[Server Startup Notice] MONGODB_URI not provided. Set MONGODB_URI in your environment or .env file.');
  }

  const server = http.createServer(async (req, res) => {
    // 1. Check if this is an API route
    if (req.url && req.url.startsWith('/api/')) {
      const handled = await handleApiRequest(req, res, process.env);
      if (handled !== null) return;
    }

    // 2. Serve static production assets from dist/
    if (fs.existsSync(distDir)) {
      let reqPath = (req.url || '/').split('?')[0];
      let filePath = path.join(distDir, reqPath);

      // Prevent directory traversal
      if (!filePath.startsWith(distDir)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
      }

      // Check if exact file exists
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
        return;
      }

      // SPA Fallback: serve dist/index.html
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(indexPath).pipe(res);
        return;
      }
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  });

  server.listen(PORT, () => {
    console.log(`[Aegis Production Server] Listening on http://localhost:${PORT}`);
  });
}

startServer();
