import { defineConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';
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
      formats: ['es', 'cjs']
    }
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json'
    }),
    external({
      nodeBuiltins: true,
      externalizeDeps: Object.keys(pkg.dependencies)
    })
  ]
});
