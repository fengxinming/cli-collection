# bombyx

[![npm package](https://nodei.co/npm/bombyx.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/bombyx)

[![NPM version](https://img.shields.io/npm/v/bombyx.svg?style=flat)](https://npmjs.org/package/bombyx)
[![NPM Downloads](https://img.shields.io/npm/dm/bombyx.svg?style=flat)](https://npmjs.org/package/bombyx)

> 🧰 一个用于自动补全项目基础配置的 CLI 工具，支持 ESLint、Husky 等开发工具初始化。

## 简介

`bombyx` 是一个轻量级命令行工具，旨在帮助开发者快速为项目添加常用开发工具的基础配置。它目前支持：

- ✅ [ESLint](https://eslint.org/)：JavaScript/TypeScript 代码检查工具
- ✅ [Husky](https://typicode.github.io/husky/)：Git hooks 工具，用于提交前校验

你可以通过 CLI 快速启用这些配置，并指定项目根目录进行定制化操作。

## 安装

使用 `npx` 直接运行（无需安装）：

```bash
npx bombyx
```

## 使用方式

### 基本用法

在项目根目录下运行：

```bash
npx bombyx
```

该命令将自动完成以下操作：

1. 检测并读取 `package.json`
2. 初始化 ESLint 配置（如未存在）
3. 初始化 Husky 配置（如未存在）
4. 更新 `package.json` 中的 `scripts` 和相关字段

### 指定工作目录

```bash
npx bombyx my-project
```

## CLI 参数说明

| 参数 | 描述 |
|------|------|
| `-h, --help`      | 显示帮助信息 |
| `-v, --version`   | 显示版本号 |

## API

```ts
import { bombyx } from 'bombyx';

await bombyx({
  dir: './your/project/dir' // 可选
});
```
