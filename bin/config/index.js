'use strict';
let dev_config;
try {
    // 本地维护，不上传github
    dev_config = require('./dev.config');
} catch (e) {
    dev_config = {};
}
module.exports = {
    dev: {
        cssSourceMap: true,
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
        bundleAnalyzerReport: false, //会打断npm && npm 这类npm指令继续执行
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],

        // publicPath: '/static',
        // outPutPath: path.join(__dirname, '../dist/static'),
        // tplPath: 'temp_views',
        productionSourceMap: false
    }
};
