import { readdirSync, statSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { concat } from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('测试 concat', () => {
  it('对比文件大小', () => {
    let size = 0;
    const fileList: string[] = [];
    readdirSync(join(__dirname, 'files'), 'utf8').filter((n) => n !== 'index.js').forEach((file) => {
      file = join(__dirname, 'files', file);
      fileList.push(file);
      size += statSync(file).size + 1;
    });

    const dest = join(__dirname, 'files/index.js');
    try {
      unlinkSync(dest);
    }
    catch (e) {
      console.error(e);
    }

    return concat({
      input: fileList,
      output: dest
    }).then(() => {
      expect(statSync(dest).size).toBe(size);
    });
  });

  it('测试异常情况', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await expect(concat()).rejects.toThrow();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await expect(concat([])).rejects.toThrow();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await expect(concat([123])).rejects.toThrow();
  });
});
