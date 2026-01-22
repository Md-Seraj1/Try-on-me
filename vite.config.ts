import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const geminiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY;
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
            '/proxy-image': {
                target: 'https://images.unsplash.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/proxy-image/, ''),
                secure: false,
                headers: {
                    'Referer': 'https://unsplash.com/',
                },
                configure: (proxy, _options) => {
                  proxy.on('error', (err, _req, _res) => {
                    console.log('proxy error', err);
                  });
                  proxy.on('proxyReq', (proxyReq, req, _res) => {
                    console.log('Sending Request to the Target:', req.method, req.url);
                  });
                  proxy.on('proxyRes', (proxyRes, req, _res) => {
                    console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                  });
                },
            },
        },
      },
      plugins: [react()],
      define: {
        // Some legacy code may reference process.env.*; in Vite prefer import.meta.env.VITE_*
        'process.env.API_KEY': JSON.stringify(geminiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(geminiKey)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
