'use strict';

// 循环引用问题  utils 运行时，引用config；而config初始化时，又引用utils，
// node在加载模块的时候会为每个新加载的文件创建一个Module对象,获取utils没有完全加载完毕，故 object类型的变量为{}
// const utils = require('../utils/index.js');
let dev_config;
try {
    // 本地维护，不上传github
    dev_config = require('./dev.config');
} catch (e) {
    dev_config = {};
}
// utils.getPort(2082).then((port) => {
//     port;
// });
module.exports = {
    dev: {
        cssSourceMap: true,
        host: '0.0.0.0',
        serverPort: 2082,
        expressPort: 24999,
        autoOpenBrowser: true,
        assetsPublicPath: '/', // 'https://cdn.xxxxx.com', // 添加路径前缀,后续cdn扩展
        assetsSubDirectory: 'static', //静态资源指向目录
        notifyOnErrors: true,
        screw_ie8: dev_config.screw_ie8 || false
    },

    build: {
        assetsPublicPath: '/',
        assetsSubDirectory: 'static', //静态资源指向目录
        bundleAnalyzerReport: false, //会打断npm && npm 这类npm指令继续执行
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],

        productionSourceMap: false
    }
};
