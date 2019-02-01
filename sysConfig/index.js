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
        // Paths
        assetsSubDirectory: '',
        publicPath: '/static',


        // todo 参数作用未定
        assetsPublicPath: '/',
        outPutPath: path.join(__dirname, '../dist/static'),

        proxyTable: {
            '/getToken': {
                target: 'http://192.168.0.237',
                changeOrigin: true,
                pathRewrite: {
                    '^/getToken': '/test/run'
                }
            }
        }
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: '/'
    }
};
