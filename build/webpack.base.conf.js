// 移除node开发环境，webpack警告
process.noDeprecation = true;

const path = require('path');
const webpack = require('webpack');
const sysConfig = require('../sysConfig');
const utils = require('./utils');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
// const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');

const entries = utils.getEntry('src/scripts/page/**/*.js', 'src/scripts/page/');
const chunks = Object.keys(entries);

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

let webpackConfig = {
    entry: entries,
    output: {
        path: sysConfig.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? sysConfig.build.assetsPublicPath
            : sysConfig.dev.assetsPublicPath
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     // include: [
            //     //     resolve('src'),
            //     //     // resolve('test'),
            //     //     // resolve('node_modules/webpack-hot-middleware'),
            //     //     resolve('node_modules/webpack-dev-server/client')
            //     // ],
            //     exclude: /(node_modules)/,
            //     query: {
            //         //处理IE8中Object.defineProperty报错的问题
            //         presets: ['es2015-loose']
            //     }
            // },
            {
                test: /\.(js|jsx|ejs|tpl)$/,
                exclude: /(node_modules)/,
                //include: path.join(projectDirname, 'src'),
                //loaders: ['babel?optional=runtime']
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
        new Es3ifyPlugin(),
        new CleanWebpackPlugin(['dist']),
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

module.exports = webpackConfig;
