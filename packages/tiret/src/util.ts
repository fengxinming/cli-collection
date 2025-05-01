import { unlink } from 'node:fs/promises';
import { builtinModules, createRequire } from 'node:module';
import { join, parse } from 'node:path';

import { build } from 'vite';

import { TaskGroup } from './types';

export * from './types';

const __require = createRequire(import.meta.url);

export async function getTask(filename: string): Promise<TaskGroup | TaskGroup[] | undefined> {
  // eslint-disable-next-line prefer-const
  let { ext, dir, name } = parse(filename);
  const isTs = ext === '.ts' || ext === '.mts';
  if (isTs) {
    const virtualName = `${name}-${Math.random().toString(36).slice(2)}.mjs`;
    await build({
      configFile: false,
      logLevel: 'silent',
      build: {
        minify: false,
        target: 'esnext',
        outDir: dir,
        emptyOutDir: false,
        lib: {
          entry: filename,
          fileName: () => virtualName,
          formats: ['es']
        },
        rollupOptions: {
          external(id) {
            return id.startsWith('node:')
              || builtinModules.some((mod) => id.startsWith(mod))
              || /(\\|\/)node_modules(\\|\/)/.test(id);
          }
        }
      }
    });
    filename = join(dir, virtualName);
    ext = '.mjs';
  }

  let config: TaskGroup | TaskGroup[] | undefined;
  switch (ext) {
    case '.js':
      config = __require(filename);
      break;
    case '.mjs':
      try {
        config = (await import(filename)).default;
      }
      finally {
        if (isTs) {
          await unlink(filename);
        }
      }
      break;
  }
  return config;
}
