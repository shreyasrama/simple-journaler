import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit(),
        // Required for cross-origin isolation and origin private file system (OPFS)
        {
            name: 'configure-response-headers',
            configureServer: (server) => {
                server.middlewares.use((_req, res, next) => {
                    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
                    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
                    next();
                });
            }
        }
    ],
    optimizeDeps: {
        exclude: ['sqlocal']
    },
    server: {
        port: 5175
    },
    worker: {
        format: 'es'
    }
});
