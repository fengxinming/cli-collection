import { readFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import cac from 'cac';
import { readCfgFile } from 'read-cfg-file';

import { concat } from './index';
import { UserConfig } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));
const cli = cac(pkg.name);

cli
  .command('[...files]', pkg.description)
  .option('-o, --output <file>', 'output file')
  .option('-c, --config <file>', 'specify a config file')
  .action(async (files, { output, config } = {}) => {
    let promise: Promise<unknown> = Promise.reject(new Error('Nothing to do.'));
    if (config) {
      config = resolve(config);

      const conf = await readCfgFile<UserConfig>(config);

      if (conf) {
        promise = concat(conf);
      }
    }
    else if (output) {
      promise = concat({
        input: files,
        output
      });
    }

    const start = Date.now();
    try {
      const dest = await promise;
      console.info(`${EOL} created ${dest} in ${Date.now() - start} ms${EOL}`);
    }
    catch (err) {
      console.error(err);
      process.exit(-1);
    }
  });

cli.version(pkg.version);
cli.help();
cli.parse(process.argv);
