
import { createReadStream, createWriteStream } from 'node:fs';
import { EOL } from 'node:os';
import { isAbsolute, join } from 'node:path';

import { globSync } from 'tinyglobby';

import { UserConfig } from './types';

export * from './types';

export function defineConfig(config: UserConfig): UserConfig {
  return config;
}

/**
 * 文件合并
 */
export function concat(config: UserConfig) {
  if (!config) {
    return Promise.reject(new TypeError('`config` can not be empty'));
  }

  const { input, options = {} } = config;
  let { output } = config;
  if (!input || !input.length) {
    return Promise.reject(new TypeError('`input` can not be empty'));
  }

  if (typeof output !== 'string' || !output) {
    return Promise.reject(new TypeError('`output` can not be empty'));
  }

  const {
    readable = 'utf8',
    writable = 'utf8',
    lineFeed = EOL,
    filePath = false,
    cwd = process.cwd()
  } = options;

  if (!isAbsolute(output)) {
    output = join(cwd, output);
  }

  return new Promise((resolveReadable, rejectReadable) => {
    const writeStream = createWriteStream(output, writable)
      .on('finish', () => {
        resolveReadable(output);
      })
      .on('error', (err) => {
        rejectReadable(err);
      });

    globSync(input, { absolute: true, cwd }).reduce((prev, p) => {
      return prev.then(() => {
        return new Promise((resolve, reject) => {
          createReadStream(p, readable)
            .on('data', (chunk) => {
              writeStream.write(chunk);
            })
            .on('end', () => {
              if (filePath) {
                writeStream.write(`// ${p}${lineFeed}`);
              }
              if (lineFeed) {
                writeStream.write(lineFeed);
              }
              resolve();
            })
            .on('error', (err) => {
              reject(err);
            });
        });
      });
    }, Promise.resolve())
      .then(() => {
        writeStream.end();
      }, (err) => {
        rejectReadable(err);
      });
  });
}
