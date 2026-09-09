import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from "node:path"
import { fileURLToPath } from "node:url"
// Old code used: import path from "path" and path.resolve(import.meta.dirname, "./src")
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  resolve: {
    alias: {
      "@": path.resolve(fileURLToPath(new URL("./src", import.meta.url))),
    },
  },
  server: {
    port: 3000,
  },
})
