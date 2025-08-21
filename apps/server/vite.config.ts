/// <reference types='vitest' />
import { defineConfig } from 'vite';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/server',

  plugins: [nxViteTsPaths()],

  // Configuration for building your application.
  // See: https://vitejs.dev/guide/build.html
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    ssr: true,
    target: 'node22',

    commonjsOptions: {
    },

    rollupOptions: {
      input: path.join(__dirname, 'src/main.ts'),

      output: {
        dir: path.join(__dirname, 'dist'),
        entryFileNames: 'main.js',
        chunkFileNames: '[name].js',
      },

      // Externalize Node.js built-ins and node_modules
      // You do NOT want to bundle all your node_modules into the server bundle.
      // Node.js can resolve them from the `node_modules` folder at runtime.
      external: [
        // Common Node.js built-in modules
        'path',
        'fs',
        'http',
        'https',
        'stream',
        'util',
        'url',
        'crypto',
        'buffer',
        'events',
        'net',
        'os',
        'child_process',
        'assert',
        'zlib',
        'querystring',

        // Common libraries
        'express',
        'cors',
        'body-parser',
        'dotenv',
        'jsonwebtoken',
        'axios',
        'ws',
        'socket.io',
        'mongodb',
        'mongoose',
        'pg',
        'mysql',
        'prisma',
        'redis',
        'sequelize',
        'typeorm',
        'winston',
        'morgan',
        'nodemailer',
        'multer',
        'compression',
        'helmet',
        'cookie-parser',
        'passport',

        /^node:.*/, // Externalize node built-in modules (Node.js 16.0.0+ syntax)
      ],
    },
  },

  test: {
    watch: false,
    globals: true,
    environment: 'node',
    include: ['{specs, tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
