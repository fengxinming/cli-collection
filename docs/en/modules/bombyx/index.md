# bombyx

[![npm package](https://nodei.co/npm/bombyx.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/bombyx)

[![NPM version](https://img.shields.io/npm/v/bombyx.svg?style=flat)](https://npmjs.org/package/bombyx)
[![NPM Downloads](https://img.shields.io/npm/dm/bombyx.svg?style=flat)](https://npmjs.org/package/bombyx)

> 🧰 A CLI tool for automatically completing basic project configurations, supporting initialization of development tools like ESLint and Husky.

## Introduction

[bombyx](file:///Users/jesse/github/cli-collection/packages/bombyx/src/index.ts#L12-L34) is a lightweight command-line tool designed to help developers quickly add basic configurations of commonly used development tools to their projects. It currently supports:

- ✅ [ESLint](https://eslint.org/): JavaScript/TypeScript code linting tool  
- ✅ [Husky](https://typicode.github.io/husky/): Git hooks tool for pre-commit validation

You can use the CLI to enable these configurations quickly, and optionally specify the project root directory for customization.

## Installation

You can run it directly using `npx` without installation:

```bash
npx bombyx
```

## Usage

### Basic Usage

Run inside your project root directory:

```bash
npx bombyx
```

This command will automatically perform the following actions:

1. Detect and read [package.json](file:///Users/jesse/github/cli-collection/package.json)
2. Initialize ESLint configuration (if not already present)
3. Initialize Husky configuration (if not already present)
4. Update `scripts` and related fields in [package.json](file:///Users/jesse/github/cli-collection/package.json)

### Specify Working Directory

You can also specify a target project directory:

```bash
npx bombyx my-project
```

## CLI Arguments

| Argument | Description |
|---------|-------------|
| `-h, --help`      | Show help message |
| `-v, --version`   | Show version number |

## API

You can also use [bombyx](file:///Users/jesse/github/cli-collection/packages/bombyx/src/index.ts#L12-L34) programmatically in your Node.js project:

```ts
import { bombyx } from 'bombyx';

await bombyx({
  dir: './your/project/dir' // Optional
});
```

This function will apply the default set of configurations to your project.
