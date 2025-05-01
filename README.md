# CLI Collection

[![GitHub issues](https://img.shields.io/github/issues/fengxinming/cli-collection)](https://github.com/fengxinming/cli-collection/issues)
[![License: MIT](https://img.shields.io/npm/l/cli-collection)](https://github.com/fengxinming/cli-collection/blob/main/LICENSE)

> A collection of lightweight and reusable CLI tools for daily development tasks.

## 📦 Overview

**CLI Collection** is a monorepo project that contains multiple small, focused command-line tools.

All packages are published under the same umbrella but can be used independently.

## 🛠️ Development

This is a monorepo managed using [PNPM Workspaces](https://pnpm.io/workspaces).

### Setup

```bash
git clone git@github.com:fengxinming/cli-collection.git
cd cli-collection
pnpm install
```

### Build All Packages

```bash
pnpm run build:all
```

### Run Tests

```bash
pnpm run test:all
```

### Lint & Format

```bash
pnpm run eslint
```

### Documentation

To develop the documentation locally:

```bash
pnpm run docs:dev
```

Build it for production:

```bash
pnpm run docs:build
```

## 📄 Documentation

📖 View the full documentation here:  
👉 [https://fengxinming.github.io/cli-collection/](https://fengxinming.github.io/cli-collection/)

## 📬 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request. Please ensure your code adheres to the linting rules and includes appropriate tests.