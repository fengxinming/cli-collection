import { EOL } from 'node:os';
import { resolve } from 'node:path';

import cac from 'cac';
import { readCfgFile } from 'read-cfg-file';

import { description, name, version } from '../package.json';
import { concat } from './index';
import { UserConfig } from './types';

const cli = cac(name);

cli
  .command('[...files]', description)
  .option('-o, --output <file>', 'output file')
  .option('-c, --config <file>', 'specify a config file')
  .action(async (files, { output, config } = {}) => {
    let promise: Promise<unknown> | null = null;
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

    if (!promise) {
      console.error('Nothing to do.');
      process.exit(-1);
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

cli.version(version);
cli.help();
cli.parse(process.argv);
