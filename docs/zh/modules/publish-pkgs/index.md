# publish-pkgs

## 简介
这是一个用于批量发布 npm 包的 CLI 工具，支持通过配置文件或命令行参数指定包信息，内置以下特性：
- 支持 `pnpm` 客户端（默认）
- 自动跳过未修改的包
- 清晰的发布结果输出
- 配置文件加载能力

## 用法
### 基本命令
```bash
npx publish-pkgs [...packages]
```

### 参数说明
| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| packages | string[] | - | 要发布的包路径列表 |
| -c, --config | string | - | 指定配置文件路径 |

### 配置文件 (JS/MJS/TS/JSON)
```json
{
  "packages": "packages/*",
  "client": "pnpm",
  "args": ["--no-git-checks"]
}
```

## 示例
### 通过命令行参数
```bash
npx publish-pkgs packages/*
```

### 通过配置文件
```bash
npx publish-pkgs -c ./publish.config.json
```

## 输出示例
```bash
Published in 1234 ms

'utils@1.0.0' released successfully!
'components@2.1.0' is up to date!
```
