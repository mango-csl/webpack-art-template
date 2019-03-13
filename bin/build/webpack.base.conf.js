// 移除node开发环境，webpack警告
process.noDeprecation = true;

// const path = require('path');
const webpack = require('webpack');
const sysConfig = require('../config/index');
const utils = require('../utils');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
// const merge = require('webpack-merge');

const Es3ifyPlugin = require('es3ify-webpack-plugin');
const files = require('../config/files');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entries = utils.getEntry(files.appPath + '/scripts/page/**/*.js', files.appPath + '/scripts/page/');
const chunks = Object.keys(entries);

let webpackConfig = {
    // entry: merge({
    //     // layui: `${files.staticPath}/lib/layui/layui.js`,
    //     // jquery: ['jquery']
    // }, entries,
    entry: entries,
    output: {
        path: files.buildPath,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? sysConfig.build.assetsPublicPath
            : sysConfig.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js']
    },
    externals: {
        // 'layui': 'window.layui' // 使用时，依旧用require的方式来使用，webpack不会把它编译进文件里
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                //include: path.join(projectDirname, 'src'),
                include: [files.staticPath],
                use: {
                    loader: 'babel-loader',
                    /*options: {
                        presets: ['env']
                    }*/
                    options: {
                        presets: ['env', 'es2015-loose']
                        //presets: ['env'],
                        //plugins: ['transform-runtime', 'proxy']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new Es3ifyPlugin(),
        // new webpack.ProvidePlugin({ // 加载jq
        //     // $: 'jquery'
        // }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        // }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
            // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
            allChunks: true
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: sysConfig.build.productionSourceMap
                ? {safe: true, map: {inline: false}}
                : {safe: true}
        }),
        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        })

    ]
};
const html = utils.getEntry(files.htmlPath + '/**/*.html', files.htmlPath + '/');
const pages = Object.keys(html);
pages.forEach(function (pathname) {
    pathname.replace('');
    const conf = {
        // filename: '../' + files.tplName + '/' + pathname + '.html', // 生成的html存放路径，相对于outPutPath
        filename: `${files.tplPath}/${pathname}.html`, // 生成的html存放路径，相对于outPutPath
        template: `${files.htmlPath}/${pathname}.html`, // html模板路径
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
        conf.favicon = files.faviconPath;
        conf.inject = 'body';
        conf.chunks = ['manifest', 'vendors', pathname];
        // conf.chunks = ['vendors', 'jquery', pathname];
        // conf.chunksSortMode = function (chunk1, chunk2) {
        //         //     const order = ['vendors', 'jquery', 'layui', pathname];
        //         //     const order1 = order.indexOf(chunk1.names[0]);
        //         //     const order2 = order.indexOf(chunk2.names[0]);
        //         //     return order1 - order2;
        //         // };
        conf.chunksSortMode = 'manual';
        conf.hash = true;
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = webpackConfig;
