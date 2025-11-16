import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

//Paths para facilitar imports
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@firebase-config': path.resolve(__dirname, './src/firebase'),
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@styles': path.resolve(__dirname, './src/styles')
    }
  }
})