import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import doEslint from './functions/eslint';
import doHusky from './functions/husky';
import Context from './shared/context';
import { updateFile } from './shared/util';
import { Options } from './types';

/**
 * 补全项目配置
 */
export function bombyx(opts: Options): Promise<void> {
  let { dir } = opts;
  if (dir) {
    dir = resolve(dir);
    if (!existsSync(dir)) {
      throw new Error(`${dir} 目录不存在.`);
    }
    if (!statSync(dir).isDirectory()) {
      throw new Error(`${dir} 不是目录.`);
    }
    opts.dir = dir;
  }
  else {
    opts.dir = process.cwd();
  }

  const ctx = new Context(opts);
  ctx.use(doEslint);
  ctx.use(doHusky);
  return ctx.run().then(() => {
    updateFile(ctx.pkgPath, ctx.pkg);
  });
}

export * from './types';
