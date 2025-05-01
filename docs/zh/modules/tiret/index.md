# tiret

[![npm package](https://nodei.co/npm/tiret.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/tiret)

[![NPM version](https://img.shields.io/npm/v/tiret.svg?style=flat)](https://npmjs.org/package/tiret)
[![NPM Downloads](https://img.shields.io/npm/dm/tiret.svg?style=flat)](https://npmjs.org/package/tiret)

> 一个轻量级性能基准测试工具，基于 Benchmark.js。

## 📘 简介

`tiret` 是一个基于 [Benchmark.js](https://benchmarkjs.com/) 构建的轻量级命令行性能基准测试工具。它允许你通过模块化的方式定义多个函数任务，并对它们进行性能对比测试。支持从 `.ts`, `.js`, `.mjs`, `.cjs` 文件中导入任务组（Task Group），并可通过 glob 模式批量加载测试文件。

该工具适用于开发者快速评估不同实现方式的执行效率，尤其适合用于算法比较、库方法优化等场景。

## 🚀 使用方式

### 基本用法

运行指定的测试文件：

```bash
npx tiret ./test/example.test.ts
```

或使用 glob 模式匹配多个文件：

```bash
npx tiret "./test/*.test.ts"
```

### 查看帮助

```bash
npx tiret --help
```

### 查看版本

```bash
npx tiret --version
```

## 🧪 功能特性

- ✅ 支持从 `.ts`, `.js`, `.mjs`, `.cjs` 文件中导入测试任务。
- ✅ 支持同步和异步任务的性能测试。
- ✅ 支持使用 glob 模式批量加载测试文件。
- ✅ 提供 `before()` 和 `done()` 钩子函数用于自定义测试前后逻辑。
- ✅ 输出每个任务的性能数据及最快结果对比。

## 📁 项目结构示例

```
project/
├── test/
│   └── example.test.ts
├── package.json
└── ...
```

### 安装

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

### 示例测试文件：`example.test.ts`

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

运行后输出：

```
add two numbers x 10,000,000 ops/sec ±1.23% (89 runs sampled)
multiply two numbers x 9,500,000 ops/sec ±1.45% (87 runs sampled)
Fastest is add two numbers
```

## 🛠️ API 接口说明

### `run(tasks: TaskGroup, opts?: RunOptions): Promise<string>`

运行一组性能测试任务。

**参数说明：**

- `tasks`: `{ [name: string]: () => any }` 类型的任务组。
- `opts.before`: 可选，在测试开始前执行的回调函数。
- `opts.done`: 可选，在测试完成后执行的回调函数。
- `opts.async`: 可选，是否以异步模式运行所有任务。

**返回值：**

- `Promise<string>`: 包含所有测试结果信息的字符串。

---

### `runFiles(input: string | string[], opts?: RunFilesOptions): Promise<void>`

批量运行多个测试文件中的任务。

**参数说明：**

- `input`: 字符串或字符串数组，表示文件路径或 glob 表达式。
- `opts.cwd`: 可选，设置当前工作目录。
- `opts.glob`: 可选，传递给 `tinyglobby` 的额外选项。
- 其他支持的 `run()` 参数也可在此传入。

## 📝 类型定义

```ts
type Task = () => any;

interface TaskGroup {
  [name: string]: Task;
}

interface RunOptions {
  before?: () => void;       // 测试开始前执行的钩子
  done?: (result: string) => void; // 测试结束后执行的钩子
  async?: boolean;           // 是否以异步模式运行
}

interface RunFilesOptions extends RunOptions {
  cwd?: string;              // 设置工作目录
  glob?: GlobOptions;        // 传递给 tinyglobby 的选项
}
```