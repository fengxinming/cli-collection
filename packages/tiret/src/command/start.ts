import { CAC } from 'cac';
import { readCfgFile } from 'read-cfg-file';
import { glob } from 'tinyglobby';

import { run } from '../index';
import { spinner } from '../spinner';
import type { TaskGroup } from '../types';

function print(msg) {
  // eslint-disable-next-line no-console
  console.log(msg);
}
export default function start(cli: CAC) {
  cli
    .command('<...files>', 'benchmark runner')
    .example((name) => {
      return `
      $ ${name} /path/index.test.js
      $ ${name} /path/**/*.test.js
`;
    })
    .action(async (input: string[]) => {
      const start = Date.now();

      const cwd = process.cwd();
      const files = await glob(input, { cwd, absolute: true });

      for (const file of files) {
        const tasks = await readCfgFile<TaskGroup | TaskGroup[]>(file);
        if (Array.isArray(tasks)) {
          print(`Benchmark ${file}`);

          for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];

            await run(task, {
              async: true,
              before() {
                spinner.start(`Suite ${i + 1}`);
              },
              done(msg) {
                spinner.done();
                print(msg);
                print('');
              }
            });

          }
        }
        else if (tasks) {
          spinner.start(`Benchmark ${file}`);

          await run(tasks, {
            async: true,
            done(msg) {
              spinner.done();
              print(msg);
              print('');
            }
          });
        }
      }

      spinner.done(`Done in ${Date.now() - start} ms.`);
    });
}
