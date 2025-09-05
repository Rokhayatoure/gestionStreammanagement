import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
//  server: {
//   port: process.env.PORT || 4000, // Render remplace process.env.PORT automatiquement
//    host: true, 
//   open: false

// }

}) 