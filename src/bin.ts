#!/usr/bin/env node

import cac from 'cac';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import concat from './index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));
const cli = cac(pkg.name);

cli
  .command('[...files]', pkg.description)
  .option('-o, --output <file>', 'output file')
  .action((files, options) => {
    const start = Date.now();
    concat(files, options.output)
    // eslint-disable-next-line no-console
      .then((dest) => console.log(`\n created ${dest} in ${Date.now() - start} ms\n`))
    // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  });

cli.version(pkg.version);
cli.help();
cli.parse(process.argv);
