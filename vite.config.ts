import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  appType: 'spa',
  plugins: [solid()],
  server: {
    port: 5176, // Dit forceert de server om de juiste poort te gebruiken
  },
})