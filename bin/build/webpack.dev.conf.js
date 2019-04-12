// 移除node开发环境，webpack警告
process.noDeprecation = true;

const webpack = require('webpack');
const sysConfig = require('../config/index');
const merge = require('webpack-merge');
const files = require('../config/files');
const utils = require('../utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

let webpackConfig = merge(baseWebpackConfig, {
    //ps：inline-source-map 其他方式（cheap-module-eval-source-map）压缩会导致开发环境在ie8下，编译异常   取消标识符，坑爹：注意webpack重启才能检验，忘记已经去除ie8 热更新了
    devtool: 'inline-source-map',
    module: {
        rules: utils.styleLoaders({sourceMap: sysConfig.dev.cssSourceMap, usePostCSS: true})
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: files.staticPath,
                to: sysConfig.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
});

// for (const key of Object.keys(webpackConfig.entry)) {
//     webpackConfig.entry[key].unshift("babel-polyfill");// 限制项目使用新语法，基础的兼容问题，采用meta注入js解决
// }
if (sysConfig.dev.screw_ie8) {
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin()
    );
}

// if (sysConfig.dev.screw_ie8) {
//     // const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
//     const hotMiddlewareScript = 'webpack-dev-server/client?http://localhost:' + sysConfig.dev.serverPort;
//     for (const key of Object.keys(webpackConfig.entry)) {
//         webpackConfig.entry[key].unshift("babel-polyfill", hotMiddlewareScript, 'webpack/hot/dev-server');
//     }
//     webpackConfig.plugins.push(
//         new webpack.HotModuleReplacementPlugin(),
//         new webpack.NoEmitOnErrorsPlugin()
//     );
// } else {
//     for (const key of Object.keys(webpackConfig.entry)) {
//         webpackConfig.entry[key].unshift("babel-polyfill");
//     }
// }

module.exports = webpackConfig;
