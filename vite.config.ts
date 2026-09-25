import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  assetsInclude: ["**/*.wasm"],
  build: {
    target: "es2022",
    outDir: "dist"
  },
  plugins: [react()],
})
