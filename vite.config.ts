import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from '@rollup/plugin-eslint'
// import legacy from '@vitejs/plugin-legacy'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      ...eslint({
        throwOnError: true,
        include: [/\.tsx?/, /\.js/],
      }),
      enforce: 'pre',
    },
    react(),
    // legacy({
    //   targets: ['defaults', 'not IE 11'],
    // }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
})
