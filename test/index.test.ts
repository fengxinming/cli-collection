import { describe, it, expect } from 'vitest';
import { join, dirname } from 'node:path';
import { statSync, readdirSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'node:url';
import concat from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('测试 concat', () => {
  it('对比文件大小', () => {
    let size = 0;
    const fileList: string[] = [];
    readdirSync(join(__dirname, 'files'), 'utf8').filter((n) => n !== 'index.js').forEach((file) => {
      file = join(__dirname, 'files', file);
      fileList.push(file);
      size += statSync(file).size;
    });

    const dest = join(__dirname, 'files/index.js');
    try {
      unlinkSync(dest);
    }
    catch (e) {}

    return concat(fileList, dest).then(() => {
      expect(statSync(dest).size).toBe(size);
    });
  });

  it('测试异常情况', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(concat()).rejects.toThrow();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(concat([])).rejects.toThrow();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(concat([123])).rejects.toThrow();
  });
});
