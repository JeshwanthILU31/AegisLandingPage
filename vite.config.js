import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleApiRequest } from './server/api.js'

function jobsApiPlugin() {
  return {
    name: 'jobs-api-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          const env = loadEnv('', process.cwd(), '');
          const handled = await handleApiRequest(req, res, env);
          if (handled !== null) return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    jobsApiPlugin()
  ],
})
