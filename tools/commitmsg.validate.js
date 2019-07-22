const fs = require('fs')
const commitMsg = fs.readFileSync(process.env.HUSKY_GIT_PARAMS, 'utf-8')
const commitPattern = /^(feat|fix|docs|style|refactor|chore)\s-(g|m|l)\s[\s\S]+$/g
const mergePattern = /^\w+-\d+\s[\s\S]+$/g

if (commitMsg.indexOf('Merge branch') > -1) {
  process.exit(0)
}

if (!commitPattern.test(commitMsg) && !mergePattern.test(commitMsg)) {
  console.info(' 💅 sorry, its a wrong message, please see under example!')
  console.info(' 👉 commit message: feat -g 提交信息')
  console.info(' 👉 merge message : DXCARE-1831 项目所有图片保真压缩')
  process.exit(1)
}

process.exit(0)
