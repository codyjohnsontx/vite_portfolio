import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
  plugins: [
    react(),
    /* Screenshots are committed as full-resolution PNGs and resized at build
       time. Any import without a query is left alone, so only the images we
       opt in get variants. */
    imagetools({
      defaultDirectives: (url) =>
        url.searchParams.has('shot')
          ? new URLSearchParams({
              format: 'webp',
              quality: '80',
              w: '640;1280;2560',
              withoutEnlargement: '',
              as: 'srcset',
            })
          : new URLSearchParams(),
    }),
  ],
});
