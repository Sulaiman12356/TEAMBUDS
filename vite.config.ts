import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'paystack-api-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && (req.url.startsWith('/api/paystack') || req.url === '/api/paystack')) {
              try {
                const { default: handler } = await import('./api/paystack.ts');
                await handler(req as any, res as any);
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
              return;
            }
            const clean = (req.url || '').split('?')[0];
            if (/^\/(admin|search|help|contact|privacy|terms|community-guidelines|agency-guidelines|payment-policy|legal|talent|agency|agency-hub|join-agency|marketplace|create-agency|client|app|login|register|forgot|reset|check-email|opportunities|onboarding|verify)(\/|$)/.test(clean)) {
              req.url = '/teambud-app.html';
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          home: path.resolve(__dirname, 'teambud-home.html'),
          app: path.resolve(__dirname, 'teambud-app.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
