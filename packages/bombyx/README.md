# bombyx

[![npm package](https://nodei.co/npm/bombyx.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/bombyx)

[![NPM version](https://img.shields.io/npm/v/bombyx.svg?style=flat)](https://npmjs.org/package/bombyx)
[![NPM Downloads](https://img.shields.io/npm/dm/bombyx.svg?style=flat)](https://npmjs.org/package/bombyx)

> 🧰 A CLI tool for automatically completing basic project configurations, supporting initialization of development tools like ESLint and Husky.

## Documentation

For detailed usage instructions and API references, please visit the official documentation:

👉 [View Full Documentation](https://fengxinming.github.io/cli-collection/modules/bombyx/)

## Usage

```bash
$ npx bombyx
                                                      

? Select a language:  › - Select one of the following languages manually.
❯   English
    简体中文
```

## Declaration

```ts
export declare function bombyx(opts: Options): Promise<void>;

export interface EslintOptions {
    /** 适配 typescript 相关 */
    ts?: boolean;
    /** 适配 react 相关 */
    react?: boolean;
}

export interface HuskyOptions {
    /** 添加 lint-staged 支持 */
    lintStaged: boolean;
    /** 添加 commitlint 支持 */
    commitLint: boolean;
}

export interface Options {
    /** 当前工作目录 */
    cwd?: string;
    /** 配置eslint */
    eslint?: boolean | EslintOptions;
    /** 配置husky */
    husky?: boolean | HuskyOptions;
    /** 自定义事件触发 */
    emitter: EventEmitter;
    /** 指定语言显示 */
    lang?: string;
}

export interface UserSelection {
    functions: string[];
    eslintExtra: string[];
}
```