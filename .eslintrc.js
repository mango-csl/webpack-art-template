// https://eslint.org/docs/user-guide/configuring
// const rules = require('./eslint/rules');
module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  env: {
    browser: true,
    // mocha: true,
    es6: true,
    node: true,
    amd: true,
    // jasmine: false
  },
  globals: {
    describe: false,
    it: false,
    afterEach:false
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    // 'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'eslint:recommended'
  ],
  // required to lint *.vue files
  plugins: [
    "html",
    "import",
    "json",
    "node",
    "promise"
  ],
  // add your custom rules here
  rules: {}
};