# fs-concat

[![npm package](https://nodei.co/npm/fs-concat.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/fs-concat)

[![NPM version](https://img.shields.io/npm/v/fs-concat.svg?style=flat)](https://npmjs.org/package/fs-concat)
[![NPM Downloads](https://img.shields.io/npm/dm/fs-concat.svg?style=flat)](https://npmjs.org/package/fs-concat)

> A CLI tool for concatenating multiple files into a single file.

## Introduction

`fs-concat` is a lightweight command-line utility that allows merging multiple text files (e.g., `.js`, `.css`, `.md`) into a single output file. It supports specifying input and output paths via command-line arguments or configuration files, making it suitable for quick bundling, archiving, and similar tasks.

## Usage

### Basic Usage (CLI)

Run directly using `npx`:

```bash
npx fs-concat file1.js file2.js -o output.js
```

- `file1.js file2.js`: Source files to be merged.
- `-o, --output <file>`: Output file path after merging.

### Using a Configuration File (CLI)

```bash
npx fs-concat --config concat.config.json
```

Example configuration file (`concat.config.json`):

```json
{
  "input": ["src/file1.js", "src/file2.js"],
  "output": "dist/output.js"
}
```

## Supported Configuration Options (UserConfig)

| Property     | Type       | Description |
|--------------|------------|-------------|
| `input`      | `string[]` | Required. List of input file paths to merge. |
| `output`     | `string`   | Required. Path to the output file. |
| `options`    | `ConcatOptions` | Optional. Additional options for merging files. |

## CLI Arguments

| Argument | Description |
|---------|-------------|
| `[...files]` | List of input file paths to merge. |
| `-o, --output <file>` | Output file path. |
| `-c, --config <file>` | Specify a configuration file path. |

## API Interface

You can import `fs-concat` as a module and use its API directly in your Node.js projects.

### `concat(options: UserConfig): Promise<string>`

Performs the file concatenation operation and returns the path of the generated output file.

#### Parameters:

- `options`: A configuration object conforming to the `UserConfig` interface.

#### Returns:

- `Promise<string>`: The path of the merged output file.

#### Throws:

- If the input is invalid, files are not found, or writing fails.

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

### ✅ API Usage Example

```ts
import { concat } from 'fs-concat';

async function run() {
  try {
    const resultPath = await concat({
      input: ['src/file1.js', 'src/file2.js'],
      output: 'dist/output.js',
      options: {
        lineFeed: '\n', // Set line separator between files
        cwd: process.cwd()
      }
    });

    console.log(`Files merged to: ${resultPath}`);
  }
  catch (error) {
    console.error('Merge failed:', error.message);
  }
}

run();
```

## CLI Examples

```bash
# Directly specify files
npx fs-concat a.js b.js c.js -o all.js

# Use a configuration file
npx fs-concat -c concat.config.json
```

## TypeScript Type Definitions

```ts
import { ReadableOptions, WritableOptions } from 'node:stream';

export interface UserConfig {
  input: string | string[];
  output: string;
  options?: ConcatOptions;
}

export interface ConcatOptions {
  readable?: ReadableOptions;  // Optional readable stream settings
  writable?: WritableOptions;  // Optional writable stream settings
  lineFeed?: string;           // Line separator between files, default: `\n`
  filePath?: boolean;          // Whether to prepend file path as comment before content
  cwd?: string;                // Current working directory
}
```
