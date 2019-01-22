const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
        resolve(__dirname, './src/index.js')
    ],
    output: {
        filename: '[name].js'
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
        new HtmlWebpackPlugin({
            template: resolve(__dirname, './src/index.art')
        })
    ]
}
