# fs-concat

[![npm package](https://nodei.co/npm/fs-concat.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/fs-concat)

[![NPM version](https://img.shields.io/npm/v/fs-concat.svg?style=flat)](https://npmjs.org/package/fs-concat)
[![NPM Downloads](https://img.shields.io/npm/dm/fs-concat.svg?style=flat)](https://npmjs.org/package/fs-concat)

> 一个用于将多个文件拼接为一个文件的 CLI 工具。

## 简介

`fs-concat` 是一个轻量级命令行工具，支持将多个文本文件（如 `.js`, `.css`, `.md` 等）合并成一个目标文件。它可以通过命令行参数或配置文件的方式指定输入与输出路径，适用于快速打包、归档等场景。

## 使用方式

### 基本用法（CLI）

使用 `npx` 直接运行：

```bash
npx fs-concat file1.js file2.js -o output.js
```

- `file1.js file2.js`: 要合并的源文件。
- `-o, --output <file>`: 合并后的输出文件路径。

### 使用配置文件（CLI）

```bash
npx fs-concat --config concat.config.json
```

配置文件示例 (`concat.config.json`)：

```json
{
  "input": ["src/file1.js", "src/file2.js"],
  "output": "dist/output.js"
}
```

## 支持的配置项（UserConfig）

| 属性名     | 类型       | 描述 |
|------------|------------|------|
| `input`    | `string[]` | 必填，要合并的输入文件路径列表 |
| `output`   | `string`   | 必填，输出文件路径 |
| `options`  | `ConcatOptions` | 可选，文件合并选项 |

## CLI 参数说明

| 参数 | 描述 |
|------|------|
| `[...files]` | 需要合并的输入文件路径列表 |
| `-o, --output <file>` | 输出文件路径 |
| `-c, --config <file>` | 指定配置文件路径 |

## API 接口说明

你可以将 `fs-concat` 作为模块引入，在 Node.js 项目中直接调用其 API 进行文件合并操作。

### `concat(options: UserConfig): Promise<string>`

执行文件拼接操作，返回生成的目标文件路径。

#### 参数说明：

- `options`：符合 `UserConfig` 接口的配置对象。

#### 返回值：

- `Promise<string>`：合并后文件的路径。

#### 抛出错误：

- 如果输入无效、文件不存在或写入失败时会抛出错误。

### Installation

::: code-group
```bash [npm]
npm add fs-concat
```
```bash [pnpm]
pnpm add fs-concat
```
```bash [yarn]
yarn add fs-concat
```
:::

### ✅ API 调用示例

```ts
import { concat } from 'fs-concat';

async function run() {
  try {
    const resultPath = await concat({
      input: ['src/file1.js', 'src/file2.js'],
      output: 'dist/output.js',
      options: {
        lineFeed: '\n', // 设置文件之间的换行符
        cwd: process.cwd()
      }
    });

    console.log(`文件已合并至: ${resultPath}`);
  }
  catch (error) {
    console.error('合并失败:', error.message);
  }
}

run();
```

## 示例（CLI）

```bash
# 直接指定文件
npx fs-concat a.js b.js c.js -o all.js

# 使用配置文件
npx fs-concat -c concat.config.json
```

## TypeScript 类型定义

```ts
import { ReadableOptions, WritableOptions } from 'node:stream';

export interface UserConfig {
  input: string | string[];
  output: string;
  options?: ConcatOptions;
}

export interface ConcatOptions {
  readable?: ReadableOptions;  // 可选的可读流配置
  writable?: WritableOptions;  // 可选的可写流配置
  lineFeed?: string;           // 文件之间插入的分隔符，默认为换行符
  filePath?: boolean;          // 是否在合并内容前添加文件路径注释
  cwd?: string;                // 当前工作目录
}
```
