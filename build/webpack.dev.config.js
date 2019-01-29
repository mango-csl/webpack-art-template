const path = require('path');
const {resolve} = path;
const glob = require('glob');
const webpack = require('webpack');
const utils = require('./utils');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const debug = process.env.NODE_ENV !== 'production';

const entries = getEntry('src/scripts/page/**/*.js', 'src/scripts/page/');
const chunks = Object.keys(entries);

module.exports = {
    entry: entries,
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/static/',
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[id].chunk.js?[chunkhash]'
    },
    module: {
        rules: [
            ...utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true}),
            {
                test: /\.html$/,
                use: [ {
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
        })
        // 处理静态资源间依赖，不需要art-template-loder 直接在node 服务中进行模板 + 数据 编译
        // new HtmlWebpackPlugin(
        //     //     {
        //     //     template: resolve(__dirname, './src/index.art')
        //     // }
        // )
    ]
};

const pages = Object.keys(getEntry('src/viewsTemp/**/*.html', 'src/viewsTemp/'));
pages.forEach(function (pathname) {
    const conf = {
        filename: '../viewsTemp/' + pathname + '.html', // 生成的html存放路径，相对于path
        template: 'src/viewsTemp/' + pathname + '.html', // html模板路径
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
    if (pathname in config.entry) {
        conf.favicon = resolve(__dirname, 'src/imgs/favicon.ico');
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = true;
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

function getEntry(globPath, pathDir) {
    const files = glob.sync(globPath);
    let {entry, dirname, basename, pathname, extname} = {};
    const entries = {};

    for (let i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.normalize(path.join(dirname, basename));
        pathDir = path.normalize(pathDir);
        if (pathname.startsWith(pathDir)) {
            pathname = pathname.substring(pathDir.length);
        }
        entries[pathname] = ['./' + entry];
    }
    return entries;
}
