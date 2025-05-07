import { EOL } from 'node:os';
import { resolve } from 'node:path';

import cac from 'cac';
import { readCfgFile } from 'read-cfg-file';

import { description, name, version } from '../package.json';
import { publishPackages } from './index';
import { PublishedResult, UserConfig } from './types';

const cli = cac(name);

cli
  .command('[...packages]', description)
  .option('-c, --config <file>', 'specify a config file')
  .action(async (packages, { config } = {}) => {
    let promise: Promise<PublishedResult[]> | null = null;
    if (config) {
      config = resolve(config);

      const conf = await readCfgFile<UserConfig>(config);

      if (conf) {
        promise = publishPackages(conf);
      }
    }
    else if (packages) {
      promise = publishPackages({
        packages,
        client: 'pnpm',
        args: ['--no-git-checks']
      });
    }

    if (!promise) {
      console.error('No packages to publish.');
      process.exit(-1);
    }

    const start = Date.now();
    try {
      const result = await promise;
      console.info(`${EOL} Published in ${Date.now() - start} ms${EOL}`);

      const messages: string[] = [];
      for (const { name, version, code } of result) {
        switch (code) {
          case 1:
            messages.push(`'${name}@${version}' released successfully!`);
            break;
          case 0:
            messages.push(`'${name}@${version}' is up to date!`);
            break;
        }
      }
      console.info(EOL + messages.join(EOL) + EOL);

    }
    catch (err) {
      console.error(err);
      process.exit(-1);
    }
  });

cli.version(version);
cli.help();
cli.parse(process.argv);
