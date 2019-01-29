const {resolve, join} = require('path');
const webpack = require('webpack');
const config = require('./config');
const utils = require('./build/utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

let chunks = ['index'];
const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        'index': [resolve(__dirname, './src/index.js')]
    },
    output: {
        path: join(__dirname, 'public'),
        publicPath: '/static/',
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[id].chunk.js?[chunkhash]'
    },
    module: {
        rules: [
            ...utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true}),
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                //resolve('node_modules/djcpsweb')
                include: [
                    resolve('src'),
                    resolve('test'),
                    resolve('node_modules/webpack-dev-server/client')
                ]
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
            },
            {
                test: /.art$/,
                use: ['art-template-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({ // 加载jq
            $: 'jquery'
        }),
        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),
        new ExtractTextPlugin('styles/[name].css'), // 单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        debug ? function () {
        } : new UglifyJsPlugin({ // 压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require'] // 排除关键字
        }),
        new HtmlWebpackPlugin({
            // filename: './views/index.html', // 生成的html存放路径，相对于path
            // todo 不知道为什么需要移除./views  跟route配置有关？
            filename: 'index.html', // 生成的html存放路径，相对于path
            template: resolve(__dirname, './src/index.html'),
            favicon: resolve(__dirname, 'favicon.ico'),
            inject: 'body',
            chunks: ['vendors', 'index'],
            hash: true
        })
    ]
};
