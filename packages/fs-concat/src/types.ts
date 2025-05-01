import { ReadableOptions, WritableOptions } from 'node:stream';

export interface UserConfig {
  input: string | string[];
  output: string;
  options?: ConcatOptions;
}

export interface ConcatOptions {
  readable?: ReadableOptions;
  writable?: WritableOptions;
  lineFeed?: string;
  filePath?: boolean;
  cwd?: string;
}
