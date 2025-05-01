import cac from 'cac';
import figlet from 'figlet';

import { name, version } from '../../package.json';
import start from './start';

function banner(msg, opts) {
  console.info('');
  try {
    console.info(figlet.textSync(msg, opts));
  }
  catch (e) {
    console.info(msg);
  }
  console.info('');
}

// 大标题
banner(name, {
  font: 'ANSI Shadow'
});

// 创建命令终端
const cli = cac();

start(cli);

cli.version(version).help();

cli.parse(process.argv);

