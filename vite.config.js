import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import contact from './integrations/node-contact.mjs'

export default defineConfig(({mode}) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return {
  plugins: [react(), tailwindcss(), {
    name: 'local-inquiry-api',
    configureServer(server) { server.middlewares.use('/api/contact', contact) },
  }],
  }
})