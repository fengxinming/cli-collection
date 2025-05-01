# tiret

[![npm package](https://nodei.co/npm/tiret.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/tiret)

[![NPM version](https://img.shields.io/npm/v/tiret.svg?style=flat)](https://npmjs.org/package/tiret)
[![NPM Downloads](https://img.shields.io/npm/dm/tiret.svg?style=flat)](https://npmjs.org/package/tiret)

> A Lightweight Performance Benchmarking CLI Tool Based on Benchmark.js.

## Documentation

For detailed usage instructions and API references, please visit the official documentation:

👉 [View Full Documentation](https://fengxinming.github.io/cli-collection/modules/tiret/)

## Introduction

`tiret` is a lightweight command-line performance benchmarking tool built on [Benchmark.js](https://benchmarkjs.com/). It allows you to define multiple function tasks in a modular way and compare their execution efficiency. The tool supports importing task groups from `.ts`, `.js`, `.mjs`, and `.cjs` files, and can load test files in bulk using glob patterns.

This tool is ideal for developers who need to quickly evaluate the performance of different implementations, especially for use cases such as algorithm comparison and library method optimization.

## Usage

### 1. Define test tasks (task.js)
```javascript
export default {
  'test name': function() {
    // Test code implementation
  }
}
```

### 2. Run tests
```bash
npx tiret path/to/task.js
```

### 3. Batch execution
```bash
npx tiret tests/*.ts
```

## API Documentation

### `run(tasks, opts)`
Execute a single test group
- `tasks` (TaskGroup): Test task object
- `opts` (RunOptions): 
  - `before`: Pre-test callback
  - `done`: Post-test callback
  - `async`: Asynchronous execution flag

### `runFiles(input, opts)`
Execute test tasks from file patterns
- `input`: File path or glob pattern
- `opts`:
  - `cwd`: Working directory
  - `globOptions`: Glob options
  - All `run()` options supported

### TaskGroup Format
```typescript
type TaskGroup = Record<string, benchmark.BenchmarkFn>
```

## Configuration Examples
### task.ts (TypeScript)
```typescript
export default {
  'array push': () => {
    const arr = [];
    for (let i = 0; i < 1000; i++) {
      arr.push(i);
    }
  },
  
  'string concat': () => {
    let str = '';
    for (let i = 0; i < 1000; i++) {
      str += 'a';
    }
  }
}
```

## Output Example
```
string concat × 150,234 ops/sec ±1.83% (84 runs sampled)
array push × 69,800 ops/sec ±1.70% (89 runs sampled)
Fastest is string concat
```

## Contributing

We welcome contributions from the community! If you find a bug or want to suggest an improvement, feel free to open an issue or submit a pull request.

### How to Contribute
1. Fork the repository.
2. Create a new branch for your changes.
3. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).
