# tiret

[![npm package](https://nodei.co/npm/tiret.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/tiret)

[![NPM version](https://img.shields.io/npm/v/tiret.svg?style=flat)](https://npmjs.org/package/tiret)
[![NPM Downloads](https://img.shields.io/npm/dm/tiret.svg?style=flat)](https://npmjs.org/package/tiret)

> A Lightweight Performance Benchmarking CLI Tool Based on Benchmark.js.

## 📘 Introduction

`tiret` is a lightweight command-line performance benchmarking tool built on [Benchmark.js](https://benchmarkjs.com/). It allows you to define multiple function tasks in a modular way and compare their execution efficiency. The tool supports importing task groups from `.ts`, `.js`, `.mjs`, and `.cjs` files, and can load test files in bulk using glob patterns.

This tool is ideal for developers who need to quickly evaluate the performance of different implementations, especially for use cases such as algorithm comparison and library method optimization.

## 🚀 Usage

### Basic Usage

Run a specific test file:

```bash
npx tiret ./test/example.test.ts
```

Or use a glob pattern to match multiple files:

```bash
npx tiret "./test/*.test.ts"
```

### View Help

```bash
npx tiret --help
```

### View Version

```bash
npx tiret --version
```

## 🧪 Features

- ✅ Supports importing test tasks from `.ts`, `.js`, `.mjs`, and `.cjs` files.
- ✅ Supports both synchronous and asynchronous task testing.
- ✅ Supports bulk loading of test files via glob patterns.
- ✅ Provides `before()` and `done()` hook functions for custom logic before and after tests.
- ✅ Outputs performance metrics for each task and highlights the fastest one.

## 📁 Project Structure Example

```
project/
├── test/
│   └── example.test.ts
├── package.json
└── ...
```

### Installation

::: code-group
```bash [npm]
npm add tiret
```
```bash [pnpm]
pnpm add tiret
```
```bash [yarn]
yarn add tiret
```
:::

### Sample Test File: `example.test.ts`

```ts
import { TaskGroup } from 'tiret';

export default {
  'add two numbers': () => {
    let a = 1 + 2;
  },
  'multiply two numbers': () => {
    let b = 1 * 2;
  }
} satisfies TaskGroup;
```

Output after running:

```
add two numbers x 10,000,000 ops/sec ±1.23% (89 runs sampled)
multiply two numbers x 9,500,000 ops/sec ±1.45% (87 runs sampled)
Fastest is add two numbers
```

## 🛠️ API Reference

### `run(tasks: TaskGroup, opts?: RunOptions): Promise<string>`

Runs a group of performance benchmark tasks.

**Parameters:**

- `tasks`: A `{ [name: string]: () => any }` object representing the task group.
- `opts.before`: Optional callback executed before the test starts.
- `opts.done`: Optional callback executed after the test completes.
- `opts.async`: Optional flag indicating whether to run tasks asynchronously.

**Returns:**

- `Promise<string>`: A string containing detailed performance results.

---

### `runFiles(input: string | string[], opts?: RunFilesOptions): Promise<void>`

Runs tasks defined in multiple test files in batch mode.

**Parameters:**

- `input`: A string or array of strings representing file paths or glob expressions.
- `opts.cwd`: Optional current working directory.
- `opts.glob`: Optional options passed to `tinyglobby`.
- Other supported `run()` options can also be used here.

## 📝 Type Definitions

```ts
type Task = () => any;

interface TaskGroup {
  [name: string]: Task;
}

interface RunOptions {
  before?: () => void;       // Hook executed before test starts
  done?: (result: string) => void; // Hook executed after test completes
  async?: boolean;           // Whether to run tasks asynchronously
}

interface RunFilesOptions extends RunOptions {
  cwd?: string;              // Current working directory
  glob?: GlobOptions;        // Options passed to tinyglobby
}
```
