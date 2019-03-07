// 移除node开发环境，webpack警告
process.noDeprecation = true;

const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const sysConfig = require('../sysConfig/index');
const utils = require('./utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const debug = process.env.NODE_ENV !== 'production';
const relatePath = '';
const entries = getEntry(relatePath + 'src/scripts/page/**/*.js', relatePath + 'src/scripts/page/');
const chunks = Object.keys(entries);
const publicPath = debug ? `http://192.168.2.167:${sysConfig.dev.port}/` : `.${sysConfig.dev.publicPath}/`;
let webpackConfig = {
    entry: entries,
    output: {
        // path: sysConfig.dev.outPutPath,
        path: '/',
        publicPath: publicPath,
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[id].chunk.js?[chunkhash]'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            // ...utils.styleLoaders({sourceMap: sysConfig.dev.cssSourceMap, usePostCSS: true}),
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
            // js babel编译，团购项目需要支持ie8，所以暂时不用Babel编译
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    // resolve('test'),
                    resolve('node_modules/webpack-hot-middleware'),
                    resolve('node_modules/webpack-dev-server/client')
                ],
                query: {
                    //处理IE8中Object.defineProperty报错的问题
                    presets: ['es2015-loose']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                    // publicPath: '../'
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
            // ,
            // {
            //     test: /.art$/,
            //     use: ['art-template-loader']
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
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
        // todo 映射static
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/static'),
                to: sysConfig.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
};
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

for (const key of Object.keys(webpackConfig.entry)) {
    webpackConfig.entry[key].unshift("babel-polyfill", hotMiddlewareScript);
}
webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
);

const pages = Object.keys(getEntry(relatePath + 'src/views/**/*.html', relatePath + 'src/views/'));
pages.forEach(function (pathname) {
    const conf = {
        filename: '../' + sysConfig.dev.tplPath + '/' + pathname + '.html', // 生成的html存放路径，相对于path
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
        conf.favicon = path.resolve(__dirname, '../favicon.ico');
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = true;
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = webpackConfig;

function getEntry(globPath, pathDir) {
    const files = glob.sync(globPath);
    const entries = {};
    let {entry, dirname, basename, pathname, extname} = {};

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

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}
