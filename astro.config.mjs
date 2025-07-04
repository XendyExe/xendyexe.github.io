// @ts-check
import { defineConfig } from 'astro/config';
// @ts-ignore
import path from 'path';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
    vite: {
    resolve: {
      alias: {
        '@assets': path.resolve('./src/assets'),
      },
    },
  },
});