import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{tsx,ts,js}"',
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
})
