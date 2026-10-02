import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'http';
import { Job } from '../models/Job.js';
import { handleApiRequest } from '../api.js';

// Helper to simulate HTTP requests against handleApiRequest
function makeMockRequest({ url, method = 'GET', headers = {}, body = null, envOverrides = {} }) {
  return new Promise((resolve) => {
    const req = new http.IncomingMessage();
    req.url = url;
    req.method = method;
    req.headers = headers;

    const res = new http.ServerResponse(req);
    let responseBody = '';

    res.write = function (chunk) {
      if (chunk) responseBody += chunk.toString();
      return true;
    };

    res.end = function (chunk) {
      if (chunk) responseBody += chunk.toString();
      let parsed = null;
      try {
        parsed = JSON.parse(responseBody);
      } catch {
        parsed = responseBody;
      }
      resolve({
        statusCode: res.statusCode,
        headers: res.getHeaders(),
        body: parsed,
      });
    };

    // Simulate body stream
    process.nextTick(() => {
      if (body) {
        req.emit('data', Buffer.from(typeof body === 'string' ? body : JSON.stringify(body)));
      }
      req.emit('end');
    });

    handleApiRequest(req, res, {
      ADMIN_USERNAME: 'admin',
      ADMIN_PASSWORD: 'testpassword123',
      ...envOverrides,
    });
  });
}

test('Job Model Schema & JSON transformation', () => {
  const jobDoc = new Job({
    title: 'Senior Incident Response Analyst',
    department: 'Incident Response',
    location: 'Bangalore / Hybrid',
    employmentType: 'Full-Time',
    description: 'Lead containment and digital forensics for complex incidents.',
    requirements: '5+ years DFIR experience.',
    postedDate: '2026-10-01',
    isActive: true,
  });

  const json = jobDoc.toJSON();
  assert.ok(json.id, 'Expected JSON to contain id mapped from _id');
  assert.strictEqual(json._id, undefined, 'Expected _id to be removed in JSON output');
  assert.strictEqual(json.__v, undefined, 'Expected __v to be removed in JSON output');
  assert.strictEqual(json.title, 'Senior Incident Response Analyst');
  assert.strictEqual(json.department, 'Incident Response');
  assert.strictEqual(json.isActive, true);
});

test('CORS: Preflight OPTIONS request and Header validation', async () => {
  // 1. Preflight OPTIONS request
  const optionsRes = await makeMockRequest({
    url: '/api/jobs',
    method: 'OPTIONS',
    headers: {
      origin: 'https://aegis-services.vercel.app',
      'access-control-request-method': 'POST',
      'access-control-request-headers': 'authorization,content-type',
    },
    envOverrides: {
      FRONTEND_URL: 'https://aegis-services.vercel.app',
    },
  });

  assert.strictEqual(optionsRes.statusCode, 204);
  assert.strictEqual(optionsRes.headers['access-control-allow-origin'], 'https://aegis-services.vercel.app');
  assert.ok(optionsRes.headers['access-control-allow-methods'].includes('POST'));
  assert.ok(optionsRes.headers['access-control-allow-headers'].includes('Authorization'));

  // 2. Regular GET with allowed origin
  const getWithOrigin = await makeMockRequest({
    url: '/api/jobs',
    method: 'GET',
    headers: {
      origin: 'https://aegis-services.vercel.app',
    },
    envOverrides: {
      FRONTEND_URL: 'https://aegis-services.vercel.app',
    },
  });
  assert.strictEqual(getWithOrigin.statusCode, 200);
  assert.strictEqual(getWithOrigin.headers['access-control-allow-origin'], 'https://aegis-services.vercel.app');

  // 3. Localhost dev origin
  const getLocalhost = await makeMockRequest({
    url: '/api/jobs',
    method: 'GET',
    headers: {
      origin: 'http://localhost:5173',
    },
    envOverrides: {
      FRONTEND_URL: 'https://aegis-services.vercel.app',
    },
  });
  assert.strictEqual(getLocalhost.statusCode, 200);
  assert.strictEqual(getLocalhost.headers['access-control-allow-origin'], 'http://localhost:5173');
});

test('Auth Flow: Login, Verify, and Logout', async () => {
  // 1. Invalid Login
  const badLogin = await makeMockRequest({
    url: '/api/auth/login',
    method: 'POST',
    body: { username: 'admin', password: 'wrongpassword' },
  });
  assert.strictEqual(badLogin.statusCode, 401);
  assert.strictEqual(badLogin.body.success, false);

  // 2. Successful Login
  const goodLogin = await makeMockRequest({
    url: '/api/auth/login',
    method: 'POST',
    body: { username: 'admin', password: 'testpassword123' },
  });
  assert.strictEqual(goodLogin.statusCode, 200);
  assert.strictEqual(goodLogin.body.success, true);
  assert.ok(goodLogin.body.token, 'Expected token in login response');

  const token = goodLogin.body.token;

  // 3. Verify Token
  const verifyRes = await makeMockRequest({
    url: '/api/auth/verify',
    method: 'GET',
    headers: { authorization: `Bearer ${token}` },
  });
  assert.strictEqual(verifyRes.statusCode, 200);
  assert.strictEqual(verifyRes.body.valid, true);

  // 4. Logout
  const logoutRes = await makeMockRequest({
    url: '/api/auth/logout',
    method: 'POST',
    headers: { authorization: `Bearer ${token}` },
  });
  assert.strictEqual(logoutRes.statusCode, 200);

  // 5. Verify after Logout -> Should fail 401
  const reVerify = await makeMockRequest({
    url: '/api/auth/verify',
    method: 'GET',
    headers: { authorization: `Bearer ${token}` },
  });
  assert.strictEqual(reVerify.statusCode, 401);
});

test('Public GET /api/jobs returns job list', async () => {
  const res = await makeMockRequest({
    url: '/api/jobs',
    method: 'GET',
  });
  assert.strictEqual(res.statusCode, 200);
  assert.ok(Array.isArray(res.body), 'Expected array of jobs');
});

test('Protected CRUD operations require authentication', async () => {
  // Unauthenticated POST
  const createUnauth = await makeMockRequest({
    url: '/api/jobs',
    method: 'POST',
    body: { title: 'Test Job', department: 'Test', location: 'Remote', description: 'Test desc' },
  });
  assert.strictEqual(createUnauth.statusCode, 401);

  // Unauthenticated PUT
  const updateUnauth = await makeMockRequest({
    url: '/api/jobs/JOB-01',
    method: 'PUT',
    body: { title: 'Updated Job' },
  });
  assert.strictEqual(updateUnauth.statusCode, 401);

  // Unauthenticated DELETE
  const deleteUnauth = await makeMockRequest({
    url: '/api/jobs/JOB-01',
    method: 'DELETE',
  });
  assert.strictEqual(deleteUnauth.statusCode, 401);
});

test('Authenticated CRUD operations succeed', async () => {
  // 1. Login to get token
  const loginRes = await makeMockRequest({
    url: '/api/auth/login',
    method: 'POST',
    body: { username: 'admin', password: 'testpassword123' },
  });
  assert.strictEqual(loginRes.statusCode, 200);
  const token = loginRes.body.token;

  // 2. Create Job
  const createRes = await makeMockRequest({
    url: '/api/jobs',
    method: 'POST',
    headers: { authorization: `Bearer ${token}` },
    body: {
      title: 'Automated Test Role',
      department: 'Technology & Tools',
      location: 'Bangalore / Hybrid',
      employmentType: 'Full-Time',
      description: 'End to end testing role.',
      requirements: 'Testing requirements.',
      isActive: true,
    },
  });
  assert.strictEqual(createRes.statusCode, 201);
  assert.ok(createRes.body.id);
  assert.strictEqual(createRes.body.title, 'Automated Test Role');
  const createdJobId = createRes.body.id;

  // 3. Update Job
  const updateRes = await makeMockRequest({
    url: `/api/jobs/${createdJobId}`,
    method: 'PUT',
    headers: { authorization: `Bearer ${token}` },
    body: {
      title: 'Automated Test Role (Updated)',
      isActive: false,
    },
  });
  assert.strictEqual(updateRes.statusCode, 200);
  assert.strictEqual(updateRes.body.title, 'Automated Test Role (Updated)');
  assert.strictEqual(updateRes.body.isActive, false);

  // 4. Delete Job
  const deleteRes = await makeMockRequest({
    url: `/api/jobs/${createdJobId}`,
    method: 'DELETE',
    headers: { authorization: `Bearer ${token}` },
  });
  assert.strictEqual(deleteRes.statusCode, 200);
  assert.strictEqual(deleteRes.body.success, true);
});
