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
        port: 2082,
        serverPort: 2082,
        expressPort: 24999,
        autoOpenBrowser: true,
        // Paths
        assetsSubDirectory: '',
        publicPath: '/static',
        tplPath: 'temp_views',
        outPutPath: path.join(__dirname, '../dist/static')
    },

    build: {
        // Template for index.html
        // index: path.resolve(__dirname, '../dist/index.html'),
        //
        // // Paths
        // assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: ''
        // assetsPublicPath: '/'
    }
};
