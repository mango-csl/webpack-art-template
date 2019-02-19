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
        host: 'localhost',
        port: 2082,
        autoOpenBrowser: true,
        // Paths
        assetsSubDirectory: '',
        publicPath: '/static',
        tplPath: 'temp_views',
        outPutPath: path.join(__dirname, '../dist/static'),

        proxyTable: {
            '/djwmsservice': 'http://192.168.2.167:3000'
        }
    },

    build: {
        // Template for index.html
        // index: path.resolve(__dirname, '../dist/index.html'),
        //
        // // Paths
        // assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        // assetsPublicPath: '/'
    }
};
