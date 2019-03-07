'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

let path = require('path');
// let dev_config;
// try {
//     dev_config = require('./dev.config');
// } catch (e) {
//     dev_config = {};
// }
module.exports = {
    dev: {
        host: '0.0.0.0',
        serverPort: 2082,
        expressPort: 24999,
        autoOpenBrowser: true,
        assetsPublicPath: '/', // 'https://cdn.xxxxx.com', // 添加路径前缀,后续cdn扩展
        assetsSubDirectory: 'static', //静态资源指向目录
        // publicPath: '/static',
        tplPath: 'temp_views'
        // outPutPath: path.join(__dirname, '../dist/static')
    },

    build: {
        // Template for index.html
        // index: path.resolve(__dirname, '../dist/index.html'),
        //
        // // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        assetsSubDirectory: 'static', //静态资源指向目录
        // publicPath: '/static',
        // outPutPath: path.join(__dirname, '../dist/static'),
        tplPath: 'temp_views',
        productionSourceMap: false
    }
};
