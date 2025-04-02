import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) => ({
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.MODE': JSON.stringify(mode)
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
}))
