'use strict';
// todo 改文件定义为webpack 有关的配置，包括开发环境的一些配置，需要迁移到build 目录
let dev_config;
try {
    dev_config = require('./dev.config');
} catch (e) {
    dev_config = {};
}
module.exports = {
    dev: {
        host: '0.0.0.0',
        serverPort: 2082,
        expressPort: 24999,
        autoOpenBrowser: true,
        assetsPublicPath: '/', // 'https://cdn.xxxxx.com', // 添加路径前缀,后续cdn扩展
        assetsSubDirectory: 'static', //静态资源指向目录
        // publicPath: '/static',
        // tplPath: 'temp_views',
        screw_ie8: dev_config.screw_ie8 || false
        // outPutPath: path.join(__dirname, '../dist/static')
    },

    build: {
        // Template for index.html
        // index: path.resolve(__dirname, '../dist/index.html'),
        //
        // // Paths
        // assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
        assetsSubDirectory: 'static', //静态资源指向目录
        // publicPath: '/static',
        // outPutPath: path.join(__dirname, '../dist/static'),
        // tplPath: 'temp_views',
        productionSourceMap: false,
        screw_ie8: false
    }
};
