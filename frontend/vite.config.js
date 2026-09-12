import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // `npm run build:demo` is served from a sub-path of the portfolio site
  // (/projects/artsconnect/), so asset URLs must be built against it.
  // Dev and the normal production build stay at the root.
  base: mode === 'demo' ? '/projects/artsconnect/' : '/',
}))
