import { GlobOptions } from 'tinyglobby';

export interface TaskEvent {
  type: string;
  timeStamp: number;
  currentTarget: any;
  target: any;
}

export interface TaskOptions {
  name: string;
  fn: () => any;
  onStart?: (e: TaskEvent) => void;
  onCycle?: (e: TaskEvent) => void;
  onAbort?: (e: TaskEvent) => void;
  onError?: (e: TaskEvent) => void;
  onReset?: (e: TaskEvent) => void;
  onComplete?: (e: TaskEvent) => void;
}

export type Task = () => any | TaskOptions;

export interface TaskGroup {
  [name: string]: Task;
}

export interface RunOptions {
  async?: boolean;
  queued?: boolean;
  before?: () => void;
  done?: (msg?: string) => void;
}

export interface RunFilesOptions extends RunOptions {
  cwd?: string;
  glob?: GlobOptions;
}
