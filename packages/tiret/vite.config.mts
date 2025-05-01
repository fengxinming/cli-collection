import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pluginExternal from 'vite-plugin-external';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: [
        'src/index.ts',
        'src/bin.ts'
      ],
      formats: ['es', 'cjs']
    }
  },
  plugins: [
    dts({
      entryRoot: 'src'
    }) as unknown as Plugin,
    pluginExternal({
      nodeBuiltins: true,
      externalizeDeps: Object.keys(pkg.dependencies)
    })
  ]
});
