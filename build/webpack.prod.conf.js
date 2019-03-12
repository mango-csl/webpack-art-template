// 移除node开发环境，webpack警告
process.noDeprecation = true;

const webpack = require('webpack');
const sysConfig = require('../sysConfig');
const files = require('../sysConfig/files');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('./utils');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

let webpackConfig = merge(baseWebpackConfig, {
    output: {
        // // path: join(__dirname, 'dist/static'),
        // path: sysConfig.build.outPutPath,
        // publicPath: `.${sysConfig.build.publicPath}/`,
        // filename: 'scripts/[name].js',
        // chunkFilename: 'scripts/[id].chunk.js?[chunkhash]'
        path: files.buildPath,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    devtool: sysConfig.build.productionSourceMap ? '#source-map' : false,
    module: {
        rules: []
    },
    plugins: [
        // new UglifyJsPlugin({ // 压缩代码
        //     output: {
        //         screw_ie8: false,
        //         beautify: true, //有正常的空格和断句，注释也会保留，
        //         comments: true,
        //         keep_quoted_props: true
        //     },
        //     screw_ie8: false,
        //     compress: {
        //         warnings: false, properties: false,screw_ie8: false
        //     },
        //     mangle: {
        //         screw_ie8: false,
        //         except: ['$']
        //     },
        //     except: ['$super', '$', 'exports', 'require'] // 排除关键字
        // }),
        // new UglifyJSPlugin({
        //     compress: {screw_ie8: false},
        //     output: {screw_ie8: false},
        //     mangle: {
        //         screw_ie8: false,
        //         except: ['$']
        //     },
        //     support_ie8: true
        // })
        new CleanWebpackPlugin([files.buildPath]),
        new webpack.optimize.UglifyJsPlugin({ // 压缩代码
            output: {
                // screw_ie8: false,
                // beautify: true, //有正常的空格和断句，注释也会保留，
                // comments: true,
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false,
                quote_keys: true, //SCRIPT1048: 缺少标识符
                keep_quoted_props: true // 是否保留对象字面量中的引号。
            },
            // screw_ie8: false,
            compress: {
                // screw_ie8: false,
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                properties: false,
                // 删除所有的 `console` 语句，可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            },
            mangle: {
                eval: true,
                screw_ie8: false, //是否把支持IE8的代码clear掉
                except: ['$super', '$', 'exports', 'require'] // 排除关键字
            }
        }),
        new CopyWebpackPlugin([
            {
                from: files.staticPath,
                to: sysConfig.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
});

module.exports = webpackConfig;
