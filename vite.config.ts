import { defineConfig } from 'vite'

export default defineConfig({
  root: 'demos',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    open: '/gspo/embed.html',
  },
})
