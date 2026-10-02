import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleApiRequest } from './api.js';
import { connectDB } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../');

// Load environment variables from .env if present (for local execution)
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
    // 1. Root / health endpoint - JSON status
    if (req.url === '/' && req.method === 'GET') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        name: 'Aegis Careers API Server',
        status: 'online',
        version: '1.0.0',
        endpoints: [
          '/api/jobs',
          '/api/auth/login',
          '/api/auth/verify',
          '/api/auth/logout'
        ]
      }));
      return;
    }

    // 2. Delegate all /api/* requests to API handler
    if (req.url && req.url.startsWith('/api/')) {
      const handled = await handleApiRequest(req, res, process.env);
      if (handled !== null) return;
    }

    // 3. API-Only Server: Any unhandled or non-API route returns JSON 404
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Not Found',
      message: `Endpoint ${req.url} does not exist on this API server.`
    }));
  });

  server.listen(PORT, () => {
    console.log(`[Aegis API Server] Listening on http://localhost:${PORT}`);
  });
}

startServer();
