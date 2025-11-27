import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 这里的名字必须和你 GitHub 仓库名完全一致
  base: '/cyberpunk-countdown/',
  server: {
    port: 3000,
    open: true,
  },
})