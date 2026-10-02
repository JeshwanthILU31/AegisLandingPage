// Aegis Job Management & Authentication Service

const TOKEN_KEY = 'aegis_admin_token';
const JOBS_STORAGE_KEY = 'aegis_jobs_cache';

// Base URL for backend API (configured via VITE_API_URL for production Vercel -> Render communication)
const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

export const jobService = {
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || '';
  },

  setToken(token, remember = false) {
    if (remember) {
      localStorage.setItem(TOKEN_KEY, token);
    }
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  clearToken() {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },

  async login(username, password, remember = false) {
    try {
      const res = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        this.setToken(data.token, remember);
        return { success: true, token: data.token, user: data.user };
      }
      return { success: false, error: data.error || 'Invalid credentials' };
    } catch (err) {
      return { success: false, error: 'Network or authentication error' };
    }
  },

  async verifyAuth() {
    const token = this.getToken();
    if (!token) return false;
    try {
      const res = await fetch(getApiUrl('/api/auth/verify'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        return !!data.valid;
      }
      this.clearToken();
      return false;
    } catch {
      return !!token;
    }
  },

  async logout() {
    const token = this.getToken();
    if (token) {
      try {
        await fetch(getApiUrl('/api/auth/logout'), {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch {
        // ignore logout failure
      }
    }
    this.clearToken();
  },

  async getJobs() {
    try {
      const token = this.getToken();
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const res = await fetch(getApiUrl('/api/jobs'), { headers });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch {
      // fallback to cached storage
    }
    const cached = localStorage.getItem(JOBS_STORAGE_KEY);
    return cached ? JSON.parse(cached) : [];
  },

  async createJob(jobData) {
    const token = this.getToken();
    try {
      const res = await fetch(getApiUrl('/api/jobs'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
      });
      if (res.ok) {
        const newJob = await res.json();
        return { success: true, job: newJob };
      }
      const err = await res.json();
      return { success: false, error: err.error || 'Failed to create job' };
    } catch (err) {
      return { success: false, error: 'Network error creating job' };
    }
  },

  async updateJob(id, jobData) {
    const token = this.getToken();
    try {
      const res = await fetch(getApiUrl(`/api/jobs/${id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jobData)
      });
      if (res.ok) {
        const updatedJob = await res.json();
        return { success: true, job: updatedJob };
      }
      const err = await res.json();
      return { success: false, error: err.error || 'Failed to update job' };
    } catch (err) {
      return { success: false, error: 'Network error updating job' };
    }
  },

  async deleteJob(id) {
    const token = this.getToken();
    try {
      const res = await fetch(getApiUrl(`/api/jobs/${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        return { success: true };
      }
      const err = await res.json();
      return { success: false, error: err.error || 'Failed to delete job' };
    } catch (err) {
      return { success: false, error: 'Network error deleting job' };
    }
  }
};
