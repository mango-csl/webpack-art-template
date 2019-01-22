const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        resolve(__dirname, './src/index.js')
    ],
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /.art$/,
                use: [ 'art-template-loader' ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false
        }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, './src/index.art'),
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeComments: true,
                useShortDoctype: true
            }
        })
    ]
}
