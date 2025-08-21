import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv';
dotenv.config();

const domain = process.env.VITE_PROXY_DOMAIN;
console.log(domain)

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: domain,  // This points to your backend
        changeOrigin: true,  // Handles CORS
      },
    },
  },
  plugins: [react(), tailwindcss()],
})
