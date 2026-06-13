import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
    plugins: [react(),
    envCompatible()
    ],
    server: {
        port: 3000,
        proxy: {
            '/api': 'http://localhost:4000',  // your backend port
        },
    },
});