function testConcat(len: number) {
  return {
    '【+=】'() {
      let str = '';
      for (let i = 0; i < len; i += 2) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        str += String(i);
      }
    },

    '【join】'() {
      const array: string[] = [];
      for (let i = 0; i < len; i += 2) {
        array.push(String(i));
      }
      array.join('');
    },

    '【sequence】'() {
      const array: string[] = [];
      for (let i = 0; i < len; i += 2) {
        array[array.length + 1] = String(i);
      }
      array.join('');
    }
  };
}

// 测试 【拼接】
export default [
  testConcat(200),
  testConcat(100),
  testConcat(50),
  {
    '【plus number】'() {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands, prefer-template, no-unused-expressions
      '' + 1;
    },
    '【String(number)】'() {
      String(1);
    }
  }
];
