import { EOL } from 'os';
import { isAbsolute, join } from 'path';
import { createWriteStream, createReadStream } from 'fs';
import { globbySync } from 'globby';

export interface Options {
  readable?: any;
  writable?: any;
  lineFeed?: string;
  filePath?: boolean;
  cwd?: string;
}

/**
 * 文件合并
 */
function concat(
  files: string | string[],
  dest: string,
  options: Options = {}
) {
  if (!files || !files.length) {
    return Promise.reject(new Error('files can not be empty'));
  }

  if (typeof dest !== 'string' || !dest) {
    return Promise.reject(new Error('dest can not be empty'));
  }

  const {
    readable = 'utf8',
    writable = 'utf8',
    lineFeed = EOL,
    filePath = false,
    cwd = process.cwd()
  } = options;

  if (!isAbsolute(dest)) {
    dest = join(cwd, dest);
  }

  return new Promise((resolveReadable, rejectReadable) => {
    const writeStream = createWriteStream(dest, writable)
      .on('finish', () => {
        resolveReadable(dest);
      })
      .on('error', (err) => {
        rejectReadable(err);
      });

    globbySync(files).reduce((prev, p) => {
      if (!isAbsolute(p)) {
        p = join(cwd, p);
      }
      return prev.then(() => {
        return new Promise((resolve, reject) => {
          createReadStream(p, readable)
            .on('data', (chunk) => {
              writeStream.write(chunk);
            })
            .on('end', () => {
              if (filePath) {
                writeStream.write(`// ${p}${EOL}`);
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

export default concat;
