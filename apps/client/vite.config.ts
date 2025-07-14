import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  root: __dirname,

  plugins: [
    remix({
      buildDirectory: "dist",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    nxViteTsPaths(),
  ],

  test: {
    setupFiles: ['test-setup.ts'],
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
});
