import cac from 'cac';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, isAbsolute, extname } from 'node:path';
import { createRequire } from 'node:module';
import concat from './index';

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
      if (!isAbsolute(config)) {
        config = join(process.cwd(), config);
      }

      let conf;
      switch (extname(config)) {
        case '.js':
          conf = createRequire(import.meta.url)(config);
          break;
        case '.mjs':
          conf = (await import(config)).default;
          break;
        case '.json':
          conf = JSON.parse(readFileSync(config, 'utf-8'));
          break;
      }

      if (conf) {
        promise = concat(conf.input, conf.output, conf.options);
      }
    }
    else if (output) {
      promise = concat(files, output);
    }

    const start = Date.now();
    try {
      const dest = await promise;
      console.info(`\n created ${dest} in ${Date.now() - start} ms\n`);
    }
    catch (err) {
      console.error(err);
      process.exit(-1);
    }
  });

cli.version(pkg.version);
cli.help();
cli.parse(process.argv);
