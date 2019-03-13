// 移除node开发环境，webpack警告
process.noDeprecation = true;

const path = require('path');
const webpack = require('webpack');
const sysConfig = require('../config/index');
const utils = require('./utils');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
// const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');
const files = require('../config/files');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const entries = utils.getEntry('src/scripts/page/**/*.js', 'src/scripts/page/');
const chunks = Object.keys(entries);

let webpackConfig = {
    entry: entries,
    output: {
        path: files.buildPath,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? sysConfig.build.assetsPublicPath
            : sysConfig.dev.assetsPublicPath
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
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        // todo dev true ?pro false?
                        sourceMap: true
                    }
                }, {
                    loader: "less-loader", options: {
                        sourceMap: true
                    }
                }]
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
        new webpack.ProvidePlugin({ // 加载jq
            $: 'jquery'
        }),
        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),
        new ExtractTextPlugin('styles/[name].css') // 单独使用link标签加载css并设置路径，相对于output配置中的publickPath

    ]
};

const pages = Object.keys(utils.getEntry('src/views/**/*.html', 'src/views/'));
pages.forEach(function (pathname) {
    pathname.replace('');
    const conf = {
        filename: '../' + files.tplName + '/' + pathname + '.html', // 生成的html存放路径，相对于outPutPath
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
        conf.favicon = files.faviconPath;
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = true;
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = webpackConfig;
