# publish-pkgs

[![npm package](https://nodei.co/npm/publish-pkgs.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/publish-pkgs)

[![NPM version](https://img.shields.io/npm/v/publish-pkgs.svg?style=flat)](https://npmjs.org/package/publish-pkgs)
[![NPM Downloads](https://img.shields.io/npm/dm/publish-pkgs.svg?style=flat)](https://npmjs.org/package/publish-pkgs)

> This is a CLI tool for batch publishing npm packages, supporting specification of package information through configuration files or command-line parameters.

## Documentation

For detailed usage instructions and API references, please visit the official documentation:

👉 [View Full Documentation](https://fengxinming.github.io/cli-collection/modules/publish-pkgs/)

## Usage

### Basic Usage

```bash
npx publish-pkgs packages/*
```

- `packages/*`: Directory path or glob pattern of package directories.

### Using a Configuration File

```bash
npx publish-pkgs --config publish.config.json
```

Example configuration file (`publish.config.json`):

```json
{
  "packages": "packages/*",
  "client": "pnpm",
  "args": ["--no-git-checks"]
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
