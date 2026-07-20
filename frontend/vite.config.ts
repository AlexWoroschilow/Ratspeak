import {defineConfig, UserConfig} from 'vite';
import {resolve} from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: './',
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        port: 9999,
        strictPort: true,
        watch: {
            usePolling: true
        },
    },
    build: {
        outDir: 'dist',
        watch: {},
        rolldownOptions: {
            input: {
                dashboard: resolve(__dirname, 'src/dashboard.jsx'),
            },
        }
    }
} as UserConfig);