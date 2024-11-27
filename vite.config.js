import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//The vite.config.js file customizes the behavior of the Vite development server and build process for your project.

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ecom/',
})
