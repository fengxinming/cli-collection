import { EOL } from 'node:os';

import benchmark from 'benchmark';
import { readCfgFile } from 'read-cfg-file';
import { glob } from 'tinyglobby';

import { RunFilesOptions, RunOptions, TaskGroup } from './types';

export * from './types';

function noop(): any {}

export async function run(tasks: TaskGroup, opts: RunOptions = {}): Promise<string> {
  const { before = noop, done = noop } = opts;

  const suite = new benchmark.Suite();
  Object.entries(tasks).forEach(([name, task]) => {
    suite.add(name, task);
  });

  return new Promise((resolve, reject) => {
    let msg = '';
    suite
      .on('cycle', (event) => {
        msg += String(event.target) + EOL;
      })
      .on('complete', function () {
        msg += `Fastest is ${this.filter('fastest').map('name')}${EOL}`;
        done(msg);
        resolve(msg);
      })
      .on('error', (evt) => {
        reject(evt);
      });
    before();
    suite.run(opts);
  });
}

export async function runFiles(input: string | string[], opts: RunFilesOptions = {}): Promise<void> {
  const { cwd, glob: globOptions, ...runOpts } = opts;
  const files = await glob(input, Object.assign({ cwd: cwd || process.cwd(), absolute: true, globOptions }));

  for (const file of files) {
    const tasks = await readCfgFile<TaskGroup | TaskGroup[]>(file);
    if (Array.isArray(tasks)) {
      for (const task of tasks) {
        await run(task, runOpts);
      }
    }
    else if (tasks) {
      await run(tasks, runOpts);
    }
  }
}
