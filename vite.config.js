import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve('src/components/'),
      hooks: path.resolve('src/hooks/'),
      routes: path.resolve('src/routes/'),
    },
  },
  plugins: [react()],
});
