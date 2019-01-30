var path = require('path');
var {resolve, join} = path;
var glob = require('glob');
var webpack = require('webpack');
var sysConfig = require('./config');
var utils = require('./build/utils');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var debug = process.env.NODE_ENV !== 'production';

var entries = getEntry('src/scripts/page/**/*.js', 'src/scripts/page/');
var chunks = Object.keys(entries);

var webpackConfig = {
    entry: entries,
    output: {
        path: join(__dirname, 'dist'),
        publicPath: '/static/',
        filename: 'scripts/[name].js',
        chunkFilename: 'scripts/[id].chunk.js?[chunkhash]'
    },
    module: {
        rules: [
            // ...utils.styleLoaders({sourceMap: sysConfig.dev.cssSourceMap, usePostCSS: true}),
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
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
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     //resolve('node_modules/djcpsweb')
            //     include: [
            //         resolve('src'),
            //         resolve('test'),
            //         resolve('node_modules/webpack-dev-server/client')
            //     ]
            // },
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
            // ,
            // {
            //     test: /.art$/,
            //     use: ['art-template-loader']
            // }
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
        // new HtmlWebpackPlugin({
        //     // filename: '../views/index.html', // 生成的html存放路径，相对于path
        //     // todo 不知道为什么需要移除./views  跟route配置有关？ 路径出错
        //     filename: 'index.html', // 生成的html存放路径，相对于path
        //     template: resolve(__dirname, './src/index.html'),
        //     favicon: resolve(__dirname, 'favicon.ico'),
        //     inject: 'body',
        //     chunks: ['vendors', 'index'],
        //     hash: true
        // })
    ]
};

var pages = Object.keys(getEntry('src/views/**/*.html', 'src/views/'));
pages.forEach(function (pathname) {
    var conf = {
        filename: '../views/' + pathname + '.html', // 生成的html存放路径，相对于path
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
        conf.favicon = path.resolve(__dirname, 'src/imgs/favicon.ico');
        conf.inject = 'body';
        conf.chunks = ['vendors', pathname];
        conf.hash = true;
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = webpackConfig;

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
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
