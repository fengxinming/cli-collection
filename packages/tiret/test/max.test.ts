function max(a, b) {
  return a > b ? a : b;
}

const array: number[] = Array.from({ length: 200 });
for (let i = 0; i < array.length; i++) {
  array[i] = Math.round(Math.random() * 10);
}

// 测试 max
export default {
  '【Math.max】'() {
    for (let i = 0, len = array.length - 1; i < len; i += 2) {
      Math.max(array[i], array[i + 1]);
    }
  },

  '【max】'() {
    for (let i = 0, len = array.length - 1; i < len; i += 2) {
      max(array[i], array[i + 1]);
    }
  }
};
