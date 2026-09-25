import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

// Resolve a path relative to this config file (ESM-safe: no __dirname).
const page = (file) => fileURLToPath(new URL(file, import.meta.url))

/**
 * Multi-page setup. Every .html file in the project root must be listed here
 * so Vite knows to build it. If you add a new page, add a line to `input`.
 *
 * `base` matters for GitHub Pages: if your site lives at
 * https://USERNAME.github.io/REPO-NAME/ you must set BASE_PATH=/REPO-NAME/
 * (the deploy workflow in .github/workflows/deploy.yml does this for you).
 * On Netlify or a custom domain, leave it alone.
 */
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        home: page('index.html'),
        donate: page('donate.html'),
        cause: page('cause.html'),
        story: page('story.html'),
        team: page('team.html'),
        thanks: page('thanks.html'),
        contact: page('contact.html'),
        notfound: page('404.html'),
      },
    },
  },
  server: { port: 5173 },
})
