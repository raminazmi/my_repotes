import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            '@/Components': path.resolve(__dirname, './resources/js/Components'),
            '@/Pages': path.resolve(__dirname, './resources/js/Pages'),
            '@/Layouts': path.resolve(__dirname, './resources/js/Layouts'),
            '@/hooks': path.resolve(__dirname, './resources/js/hooks'),
            '@/lib': path.resolve(__dirname, './resources/js/lib'),
            '@/store': path.resolve(__dirname, './resources/js/store'),
            '@/data': path.resolve(__dirname, './resources/js/data'),
            '@/assets': path.resolve(__dirname, './resources/js/assets'),
        },
    },
});
