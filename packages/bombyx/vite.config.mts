import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import external from 'vite-plugin-external';

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
      formats: ['es', 'cjs'],
      fileName: '[name]'
    }
  },
  plugins: [
    dts({
      entryRoot: 'src',
      include: 'src/*.ts'
    }),
    external({
      nodeBuiltins: true,
      externalizeDeps: Object.keys(pkg.dependencies)
    })
  ]
});
