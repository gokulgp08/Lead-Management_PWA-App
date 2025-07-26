import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      strategies: 'injectManifest',
      srcDir: './src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Lead Management System',
        short_name: 'LeadMS',
        description: 'Multi-tenant lead management Progressive Web App',
        theme_color: '#1e40af',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}']
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ]
});