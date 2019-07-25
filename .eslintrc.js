const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  extends: [...strictEslint.extends, 'plugin:prettier/recommended'],
  rules: {
    ...strictEslint.rules,
    'max-len': 0,
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
