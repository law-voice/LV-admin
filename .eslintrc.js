const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  extends: [...strictEslint.extends, 'plugin:prettier/recommended'],
  rules: {
    ...strictEslint.rules,
    'max-len': 0,
    //函数参数不允许二次赋值
    'no-param-reassign': 0,
    //parseInt 必须主动传入第二个参数表示进制
    radix: 0,
    //禁止使用位操作符
    'no-bitwise': 0,
    // 禁用 js 特性语法
    'no-restricted-syntax': 0,
    // 禁止以_开头的属性名
    'no-underscore-dangle': 0,
    //禁止匿名函数
    'func-names': 0,
    //禁止自增运算符
    'no-plusplus': 0,
    //禁止使用对象某些属性
    'no-restricted-properties': 0,
    // 未重新赋值的变量用 const 声明
    'prefer-const': 0,
    'import/no-extraneous-dependencies': 0,
    // async 需要返回值
    'consistent-return': 0,
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
