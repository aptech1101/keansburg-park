import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // proxy để call đến backend ( backend đang chạy là trên xampp cổng 80)

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/GitFork/keansburg-park/backend/public',
        changeOrigin: true,
        
        
      },
    },
  },
});
