// 根据指定文件夹, 生成目录树
const fs = require('fs');
const path = require('path');
const process = require('process');

const ignoreDirs = ['.git', 'node_modules', 'mock', 'test'];
let content = '';
let isRoot = true;

const rootDir = path.join(__dirname, '../');

// 目标目录
function loadTree(target, deep) {
  const prev = new Array(deep).join(' |');
  // 前面| 字符串
  const dirinfo = fs.readdirSync(target);
  const files = [];
  let dirs = [];
  // 保存文件或者是文件夹

  // 遍历将文件或者文件夹分开存储
  for (let i = 0; i < dirinfo.length; i++) {
    const state = fs.statSync(path.join(target, dirinfo[i]));
    if (state.isFile()) {
      files.push(dirinfo[i]);
    } else {
      dirs.push(dirinfo[i]);
    }
  }

  if (isRoot) {
    dirs = dirs.filter(dirName => !ignoreDirs.includes(dirName));
    isRoot = false;
  }

  // 文件夹操作
  for (let i = 0; i < dirs.length; i++) {
    content += `${prev} ├─ ${dirs[i]}\n`;
    // 递归
    const nextPath = path.join(target, dirs[i]);
    const nextdeep = deep + 1;
    // 下一级的 文件目录 以及层级
    loadTree(nextPath, nextdeep);
    // 递归调用
  }
  // 文件操作
  for (let i = files.length - 1; i >= 0; i--) {
    if (i === 0) {
      content += `${prev} └─  ${files[i]}\n`;
    } else {
      content += `${prev} ├─  ${files[i]}\n`;
    }
  }
}

loadTree(rootDir, 1);

const outputDir = path.resolve(rootDir, 'file-tree.txt');
fs.writeFile(outputDir, content, err => {
  console.log('success, 文件写入成功!');
});
