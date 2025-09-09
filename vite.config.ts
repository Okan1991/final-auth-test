import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  publicDir: 'public',  // Belangrijk!
  server: {
    port: 5176,
    host: true
  },
  build: {
    target: 'esnext',
  },
});