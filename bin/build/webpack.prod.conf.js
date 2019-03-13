// 移除node开发环境，webpack警告
process.noDeprecation = true;

const webpack = require('webpack');
const sysConfig = require('../config/index');
const files = require('../config/files');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('../utils');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

let webpackConfig = merge(baseWebpackConfig, {
    output: {
        path: files.buildPath,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    devtool: sysConfig.build.productionSourceMap ? '#source-map' : false,
    module: {
        rules: utils.styleLoaders({
            sourceMap: sysConfig.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: files.rootPath,
            verbose: true,
            dry: false
        }),
        // new ExtractTextPlugin({
        //     filename: utils.assetsPath('css/[name].[contenthash].css'),
        //     // Setting the following option to `false` will not extract CSS from codesplit chunks.
        //     // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
        //     // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
        //     // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
        //     allChunks: true
        // }),
        // // Compress extracted CSS. We are using this plugin so that possible
        // // duplicated CSS from different components can be deduped.
        // new OptimizeCSSPlugin({
        //     cssProcessorOptions: sysConfig.build.productionSourceMap
        //         ? {safe: true, map: {inline: false}}
        //         : {safe: true}
        // }),
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
            // sourceMap: config.build.productionSourceMap // 打包到测试环境时，可开启，方便调试
        }),
        new CopyWebpackPlugin([
            {
                from: files.staticPath,
                to: sysConfig.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting 提升作用域  es module 中需要配合使用
        new webpack.optimize.ModuleConcatenationPlugin(),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        })
    ]
});

if (sysConfig.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                sysConfig.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}
if (sysConfig.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
