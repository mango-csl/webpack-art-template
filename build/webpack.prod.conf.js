// 移除node开发环境，webpack警告
process.noDeprecation = true;

const path = require('path');

const webpack = require('webpack');
const sysConfig = require('../sysConfig');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const baseWebpackConfig = require('./webpack.base.conf');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

let webpackConfig = merge(baseWebpackConfig, {
    output: {
        // // path: join(__dirname, 'dist/static'),
        // path: sysConfig.build.outPutPath,
        // publicPath: `.${sysConfig.build.publicPath}/`,
        // filename: 'scripts/[name].js',
        // chunkFilename: 'scripts/[id].chunk.js?[chunkhash]'
        path: sysConfig.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    devtool: sysConfig.build.productionSourceMap ? '#source-map' : false,
    module: {
        rules: [
            // js babel编译，团购项目需要支持ie8，所以暂时不用Babel编译
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: 'babel-loader'
            //         },
            //         {
            //             loader: 'es3ify-loader'
            //         }
            //     ]
            //     //resolve('node_modules/djcpsweb')
            //     // include: [
            //     //     resolve('src'),
            //     //     resolve('node_modules/webpack-build-server/client')
            //     // ]
            // }
        ]
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
        new webpack.optimize.UglifyJsPlugin({ // 压缩代码
            output: {
                // screw_ie8: false,
                beautify: true, //有正常的空格和断句，注释也会保留，
                comments: true,
                quote_keys: true, //SCRIPT1048: 缺少标识符
                keep_quoted_props: true // 是否保留对象字面量中的引号。
            },
            // screw_ie8: false,
            compress: {
                // screw_ie8: false,
                warnings: false,
                properties: false
            },
            mangle: {
                eval: true,
                screw_ie8: false, //是否把支持IE8的代码clear掉
                except: ['$super', '$', 'exports', 'require'] // 排除关键字
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/static'),
                to: sysConfig.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
});

const pages = Object.keys(utils.getEntry('src/views/**/*.html', 'src/views/'));
pages.forEach(function (pathname) {
    const conf = {
        filename: '../' + sysConfig.build.tplPath + '/' + pathname + '.html', // 生成的html存放路径，相对于outPutPath
        template: 'src/views/' + pathname + '.html', // html模板路径
        inject: false // js插入的位置，true/'head'/'body'/false
        /*
         * 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
         * 如在html标签属性上使用{{...}}表达式，很多情况下并不需要在此配置压缩项，
         * 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
         * 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
         */
        // minify: { //压缩HTML文件
        //  removeComments: true, //移除HTML中的注释
        //  collapseWhitespace: false //删除空白符与换行符
        // }
    };
    if (pathname in webpackConfig.entry) {
        conf.favicon = path.resolve(__dirname, '../src/imgs/favicon.ico');
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = true;
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = webpackConfig;
