function min(a, b) {
  return a < b ? a : b;
}

const array: number[] = Array.from({ length: 200 });
for (let i = 0; i < array.length; i++) {
  array[i] = Math.round(Math.random() * 10);
}

// 测试 min
export default {
  '【Math.min】'() {
    for (let i = 0, len = array.length - 1; i < len; i += 2) {
      Math.min(array[i], array[i + 1]);
    }
  },

  '【min】'() {
    for (let i = 0, len = array.length - 1; i < len; i += 2) {
      min(array[i], array[i + 1]);
    }
  }
};
