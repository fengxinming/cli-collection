import { runFiles } from '../src/index';

await runFiles('./test/*.test.ts', {
  async: true,
  done(msg) {
    console.info(msg);
  }
});

process.exit(0);
