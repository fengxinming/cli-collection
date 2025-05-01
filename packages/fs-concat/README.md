# fs-concat

[![npm package](https://nodei.co/npm/fs-concat.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/fs-concat)

[![NPM version](https://img.shields.io/npm/v/fs-concat.svg?style=flat)](https://npmjs.org/package/fs-concat)
[![NPM Downloads](https://img.shields.io/npm/dm/fs-concat.svg?style=flat)](https://npmjs.org/package/fs-concat)

> A CLI tool for concatenating multiple files into a single file.

## Documentation

For detailed usage instructions and API references, please visit the official documentation:

👉 [View Full Documentation](https://fengxinming.github.io/node-collection/modules/fs-concat/)

## Introduction

`fs-concat` is a lightweight command-line utility that allows you to merge multiple text files (e.g., `.js`, `.css`, `.md`) into a single output file. It supports specifying input and output paths via command-line arguments or configuration files, making it suitable for quick bundling, archiving, and similar tasks.

## Usage

### Basic Usage

```bash
npx fs-concat file1.js file2.js -o output.js
```

- `file1.js file2.js`: Source files to be merged.
- `-o, --output <file>`: Output file path after merging.

### Using a Configuration File

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

## Contributing

We welcome contributions from the community! If you find a bug or want to suggest an improvement, feel free to open an issue or submit a pull request.

### How to Contribute
1. Fork the repository.
2. Create a new branch for your changes.
3. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).
