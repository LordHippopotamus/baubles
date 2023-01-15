import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      modules: path.resolve('src/modules/'),
      routes: path.resolve('src/routes/'),
    },
  },
  plugins: [react()],
});
