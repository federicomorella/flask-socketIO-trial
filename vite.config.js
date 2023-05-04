import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { API_URL } from './config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:'0.0.0.0',
    port:3000,
    proxy: {
      '/v1/': {
        target: API_URL,
        changeOrigin: true,
      }
    }
  },

})
