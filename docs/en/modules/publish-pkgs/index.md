# publish-pkgs

## Introduction
This is a CLI tool for batch publishing npm packages, supporting specification of package information through configuration files or command-line parameters. Key features include:
- Supports `pnpm` client (default)
- Automatically skips unchanged packages
- Clear publication result output
- Configuration file loading capability

## Usage
### Basic Command
```bash
npx publish-pkgs [...packages]
```

### Parameters
| Parameter | Type | Default | Description |
|---------|------|---------|-----------|
| packages | string[] | - | List of package paths to publish |
| -c, --config | string | - | Specify configuration file path |

### Configuration File (JS/MJS/TS/JSON)
```json
{
  "packages": "packages/*",
  "client": "pnpm",
  "args": ["--no-git-checks"]
}
```

## Examples
### Command-line Parameters
```bash
npx publish-pkgs packages/*
```

### Configuration File
```bash
npx publish-pkgs -c ./publish.config.json
```

## Output Example
```bash
Published in 1234 ms

'utils@1.0.0' released successfully!
'components@2.1.0' is up to date!
```