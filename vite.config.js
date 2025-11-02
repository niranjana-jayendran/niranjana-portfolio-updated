import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you use the special repo name `niranjana-jayendran.github.io`,
// GitHub Pages serves from root, so base is '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
