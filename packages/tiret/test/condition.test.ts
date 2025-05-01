const num = 0;

// 测试 【substring】
export default {
  '【switch】'() {
    let str = '';
    switch (typeof num) {
      case 'number':
        str = 'number';
        break;
      case 'string':
        str = 'string';
        break;
      default:
        str = 'other';
    }
    // eslint-disable-next-line no-unused-expressions
    str;
  },

  '【if】'() {
    let str = '';
    const type = typeof num;
    if (type === 'number') {
      str = 'number';
    }
    else if (type === 'string') {
      str = 'string';
    }
    else {
      str = 'other';
    }
    // eslint-disable-next-line no-unused-expressions
    str;
  }
};
