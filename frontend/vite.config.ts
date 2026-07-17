import {defineConfig, UserConfig} from 'vite';
import {resolve} from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: './',
    plugins: [react()],
    server: {
        host: '0.0.0.0', // Разрешает доступ из внешней сети и Docker
        port: 9999,      // Устанавливает порт 9999
        strictPort: true // Предотвращает запуск на другом порту, если 9999 занят
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                dashboard: resolve(__dirname, 'src/dashboard.jsx'),
            },
            output: {
                entryFileNames: 'static/[name].js',
                chunkFileNames: 'static/[name].js',
                assetFileNames: 'static/[name].[ext]'
            }
        }
    }
} as UserConfig);