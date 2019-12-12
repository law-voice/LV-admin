/* eslint-disable-next-line import/no-extraneous-dependencies */
const chalk = require('chalk');
const fs = require('fs');

const commitMsg = fs.readFileSync(process.env.HUSKY_GIT_PARAMS, 'utf-8').trim();
const commitPattern = /^(feat|fix|docs|style|refactor|chore)\s-(g|m|l)\s.{1,50}$/g;

if (commitMsg.indexOf('Merge branch') > -1) {
  process.exit(0);
}

if (!commitPattern.test(commitMsg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(` 💅 sorry, its a invalid commit message format.`)}\n\n${chalk.red(
      `  please see under examples:\n\n`,
    )}    ${chalk.green(` 👉 commit message: feat -g 提交信息`)}\n` +
      `    ${chalk.green(` 👉 merge message : fix -l 项目所有图片保真压缩`)}\n\n${chalk.red(
        `  See README.md for more details.\n`,
      )}`,
  );
  process.exit(1);
}

process.exit(0);
