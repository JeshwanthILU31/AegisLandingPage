import crypto from 'crypto';
import mongoose from 'mongoose';
import { connectDB, isDbConnected } from './db.js';
import { Job } from './models/Job.js';
import fs from 'fs';
import path from 'path';

// Active in-memory session tokens store
const activeSessions = new Set();

const LOCAL_DEV_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:4173',
];

const PRODUCTION_ORIGINS = [
  'https://aegisservice.in',
];

/**
 * Check if the incoming request origin is allowed based on FRONTEND_URL & local dev origins
 */
function resolveAllowedOrigin(origin, frontendUrlEnv) {
  if (!origin) return null;

  const cleanOrigin = origin.trim().replace(/\/+$/, '');

  // 1. Check configured FRONTEND_URL(s)
  if (frontendUrlEnv) {
    const configuredList = frontendUrlEnv
      .split(',')
      .map((u) => u.trim().replace(/\/+$/, ''))
      .filter(Boolean);

    if (configuredList.includes(cleanOrigin)) {
      return cleanOrigin;
    }
  }

  // 2. Check canonical production origins (apex domain only)
  if (PRODUCTION_ORIGINS.includes(cleanOrigin)) {
    return cleanOrigin;
  }

  // 3. Allow localhost development origins
  if (LOCAL_DEV_ORIGINS.includes(cleanOrigin) || /^http:\/\/localhost:\d+$/.test(cleanOrigin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(cleanOrigin)) {
    return cleanOrigin;
  }

  // 4. If FRONTEND_URL is not explicitly set, fallback to clean origin if in development
  if (!frontendUrlEnv && process.env.NODE_ENV !== 'production') {
    return cleanOrigin;
  }

  return null;
}

/**
 * Attach CORS headers to the response
 */
function applyCorsHeaders(req, res, env = {}) {
  const origin = req.headers['origin'];
  const frontendUrl = env.FRONTEND_URL || process.env.FRONTEND_URL;
  const allowedOrigin = resolveAllowedOrigin(origin, frontendUrl);

  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else if (!frontendUrl) {
    // Development fallback
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Vary', 'Origin');
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', (err) => reject(err));
  });
}

function checkAuthToken(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  return Boolean(token && activeSessions.has(token));
}

/**
 * Handle incoming /api/ HTTP requests
 * Works identically in Vite dev middleware and standalone Node production server.
 */
export async function handleApiRequest(req, res, env = {}) {
  // Apply CORS headers on all responses
  applyCorsHeaders(req, res, env);

  const url = req.url || '';
  const method = req.method || 'GET';

  // Handle preflight OPTIONS request
  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Content-Length', '0');
    res.end();
    return true;
  }

  // Read admin credentials from server environment
  const adminUsername = env.ADMIN_USERNAME || process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'admin@123';
  const mongoUri = env.MONGODB_URI || process.env.MONGODB_URI;

  // Auto-connect to MongoDB if URI is configured and not yet connected
  if (mongoUri && !isDbConnected()) {
    try {
      await connectDB(mongoUri);
    } catch (err) {
      console.error('[API Database Error]', err.message);
    }
  }

  // 1. POST /api/auth/login
  if (url === '/api/auth/login' && method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { username, password } = body;

      if (username === adminUsername && password === adminPassword) {
        const token = crypto.randomBytes(32).toString('hex');
        activeSessions.add(token);
        return sendJson(res, 200, {
          success: true,
          token,
          user: { username: adminUsername },
        });
      }
      return sendJson(res, 401, {
        success: false,
        error: 'Invalid username or password',
      });
    } catch (err) {
      return sendJson(res, 400, { success: false, error: err.message });
    }
  }

  // 2. GET /api/auth/verify
  if (url === '/api/auth/verify' && method === 'GET') {
    if (checkAuthToken(req)) {
      return sendJson(res, 200, { success: true, valid: true });
    }
    return sendJson(res, 401, { success: false, valid: false, error: 'Unauthorized' });
  }

  // 3. POST /api/auth/logout
  if (url === '/api/auth/logout' && method === 'POST') {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (token) {
      activeSessions.delete(token);
    }
    return sendJson(res, 200, { success: true, message: 'Logged out successfully' });
  }

  // 4. GET /api/jobs (Public read active / Admin read all)
  if (url.startsWith('/api/jobs') && method === 'GET') {
    const isAuthenticated = checkAuthToken(req);
    const parsedUrl = new URL(url, 'http://localhost');
    const includeAll = isAuthenticated || parsedUrl.searchParams.get('all') === 'true';

    try {
      if (isDbConnected()) {
        const filter = includeAll ? {} : { isActive: true };
        const jobs = await Job.find(filter).sort({ postedDate: -1, createdAt: -1 });
        return sendJson(res, 200, jobs);
      }

      // Graceful fallback to data/jobs.json if MongoDB is not connected
      const jobsFilePath = path.resolve(process.cwd(), 'data/jobs.json');
      if (fs.existsSync(jobsFilePath)) {
        const raw = fs.readFileSync(jobsFilePath, 'utf8');
        let data = JSON.parse(raw);
        if (!includeAll) {
          data = data.filter((j) => j.isActive !== false);
        }
        return sendJson(res, 200, data);
      }
      return sendJson(res, 200, []);
    } catch (err) {
      console.error('[API Error: GET /api/jobs]', err);
      return sendJson(res, 500, { error: 'Failed to retrieve job listings' });
    }
  }

  // 5. POST /api/jobs (Protected: Admin create job)
  if (url === '/api/jobs' && method === 'POST') {
    if (!checkAuthToken(req)) {
      return sendJson(res, 401, { error: 'Unauthorized. Admin session required.' });
    }

    try {
      const jobData = await parseJsonBody(req);
      if (!jobData.title || !jobData.department || !jobData.location || !jobData.description) {
        return sendJson(res, 400, {
          error: 'Validation error: Title, Department, Location, and Description are required.',
        });
      }

      if (isDbConnected()) {
        const newJob = await Job.create({
          title: String(jobData.title).trim(),
          department: String(jobData.department).trim(),
          location: String(jobData.location).trim(),
          employmentType: String(jobData.employmentType || 'Full-Time').trim(),
          description: String(jobData.description).trim(),
          requirements: jobData.requirements || '',
          postedDate: jobData.postedDate || new Date().toISOString().split('T')[0],
          isActive: jobData.isActive !== false,
        });
        return sendJson(res, 201, newJob);
      }

      // Fallback local persistence if Mongo not active
      const jobsFilePath = path.resolve(process.cwd(), 'data/jobs.json');
      let currentJobs = [];
      if (fs.existsSync(jobsFilePath)) {
        currentJobs = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
      }
      const newJob = {
        id: `JOB-${String(Date.now()).slice(-4)}`,
        title: String(jobData.title).trim(),
        department: String(jobData.department).trim(),
        location: String(jobData.location).trim(),
        employmentType: String(jobData.employmentType || 'Full-Time').trim(),
        description: String(jobData.description).trim(),
        requirements: jobData.requirements || '',
        postedDate: jobData.postedDate || new Date().toISOString().split('T')[0],
        isActive: jobData.isActive !== false,
      };
      currentJobs.unshift(newJob);
      fs.writeFileSync(jobsFilePath, JSON.stringify(currentJobs, null, 2));
      return sendJson(res, 201, newJob);
    } catch (err) {
      console.error('[API Error: POST /api/jobs]', err);
      return sendJson(res, 500, { error: 'Failed to create job posting' });
    }
  }

  // 6. PUT /api/jobs/:id (Protected: Admin update job)
  if (url.startsWith('/api/jobs/') && method === 'PUT') {
    if (!checkAuthToken(req)) {
      return sendJson(res, 401, { error: 'Unauthorized. Admin session required.' });
    }

    const jobId = url.replace('/api/jobs/', '').split('?')[0];
    if (!jobId) {
      return sendJson(res, 400, { error: 'Job ID is required' });
    }

    try {
      const updateData = await parseJsonBody(req);

      if (isDbConnected()) {
        let updated = null;
        if (mongoose.Types.ObjectId.isValid(jobId)) {
          updated = await Job.findByIdAndUpdate(jobId, { $set: updateData }, { new: true, runValidators: true });
        }
        if (!updated) {
          updated = await Job.findOneAndUpdate({ legacyId: jobId }, { $set: updateData }, { new: true, runValidators: true });
        }

        if (!updated) {
          return sendJson(res, 404, { error: 'Job not found in database' });
        }
        return sendJson(res, 200, updated);
      }

      // Fallback local persistence if Mongo not active
      const jobsFilePath = path.resolve(process.cwd(), 'data/jobs.json');
      if (fs.existsSync(jobsFilePath)) {
        let currentJobs = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
        const index = currentJobs.findIndex((j) => j.id === jobId);
        if (index === -1) {
          return sendJson(res, 404, { error: 'Job not found' });
        }
        currentJobs[index] = { ...currentJobs[index], ...updateData, id: jobId };
        fs.writeFileSync(jobsFilePath, JSON.stringify(currentJobs, null, 2));
        return sendJson(res, 200, currentJobs[index]);
      }
      return sendJson(res, 404, { error: 'Job not found' });
    } catch (err) {
      console.error('[API Error: PUT /api/jobs/:id]', err);
      return sendJson(res, 500, { error: 'Failed to update job posting' });
    }
  }

  // 7. DELETE /api/jobs/:id (Protected: Admin delete job)
  if (url.startsWith('/api/jobs/') && method === 'DELETE') {
    if (!checkAuthToken(req)) {
      return sendJson(res, 401, { error: 'Unauthorized. Admin session required.' });
    }

    const jobId = url.replace('/api/jobs/', '').split('?')[0];
    if (!jobId) {
      return sendJson(res, 400, { error: 'Job ID is required' });
    }

    try {
      if (isDbConnected()) {
        let deleted = null;
        if (mongoose.Types.ObjectId.isValid(jobId)) {
          deleted = await Job.findByIdAndDelete(jobId);
        }
        if (!deleted) {
          deleted = await Job.findOneAndDelete({ legacyId: jobId });
        }

        if (!deleted) {
          return sendJson(res, 404, { error: 'Job not found in database' });
        }
        return sendJson(res, 200, { success: true, message: `Job ${jobId} deleted successfully` });
      }

      // Fallback local persistence if Mongo not active
      const jobsFilePath = path.resolve(process.cwd(), 'data/jobs.json');
      if (fs.existsSync(jobsFilePath)) {
        let currentJobs = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
        const initialLen = currentJobs.length;
        currentJobs = currentJobs.filter((j) => j.id !== jobId);
        if (currentJobs.length === initialLen) {
          return sendJson(res, 404, { error: 'Job not found' });
        }
        fs.writeFileSync(jobsFilePath, JSON.stringify(currentJobs, null, 2));
        return sendJson(res, 200, { success: true, message: `Job ${jobId} deleted successfully` });
      }
      return sendJson(res, 404, { error: 'Job not found' });
    } catch (err) {
      console.error('[API Error: DELETE /api/jobs/:id]', err);
      return sendJson(res, 500, { error: 'Failed to delete job posting' });
    }
  }

  return null; // Not an API route handled here
}
