const str = (new Array(100)).fill(0).join('');
const start = Math.round(Math.random() * 50);
const end = Math.round(Math.random() * 50) + 50;

// 测试 【substring】
export default {
  '【substring】'() {
    str.substring(start, end);
  },

  '【slice】'() {
    str.slice(start, end);
  }
};
