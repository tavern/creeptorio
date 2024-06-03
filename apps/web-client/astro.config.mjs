import solidJs from '@astrojs/solid-js'
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [solidJs({ devtools: true }), tailwind({ applyBaseStyles: false })],
  experimental: {
    actions: true,
  },
})
