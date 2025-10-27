// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Quando o Frontend chamar /api/v1/..., o Vite irá encaminhar para o Backend
      '/api/v1': {
        target: 'http://127.0.0.1:3000', // Use 127.0.0.1 ou o IP interno
        changeOrigin: true, // Necessário para evitar problemas de CORS
        // Reescreve a URL se necessário (aqui não é necessário, mas é bom saber)
        // rewrite: (path) => path.replace(/^\/api\/v1/, '') 
      },
    },
  },
});