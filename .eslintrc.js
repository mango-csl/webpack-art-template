// https://eslint.org/docs/user-guide/configuring
// const rules = require('./eslint/rules');
module.exports = {
    root: true,
    parser: "babel-eslint",
    env: {
        browser: true,
        es6: true,
        node: true
    },
    globals: {
        describe: false,
        it: false,
        afterEach: false,
        'jQuery': true,
        '$': true,
        'layui': true
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        // 'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'eslint:recommended',
        'djcps'
    ],
    plugins: [
        "html",
        "json",
        "node",
        "promise"
    ],
    // add your custom rules here
    rules: {}
};
