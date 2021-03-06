/**
 * 开发运行环境，除了view/*.html的文件改动需要手动刷新，其他的src/* 的修改支持热更新
 */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../build/webpack.dev.conf');
const files = require('../config/files');
const sysConfig = require('../config/index');
require('shelljs/global');

let expressPort = sysConfig.dev.expressPort || 24999;
let serverPort = sysConfig.dev.serverPort || 2082;

const options = {
    publicPath: '/',
    hot: sysConfig.dev.screw_ie8,
    inline: sysConfig.dev.screw_ie8,
    port: serverPort,
    host: sysConfig.dev.host,
    proxy: {
        '*': 'http://localhost:' + expressPort
    },
    open: sysConfig.dev.autoOpenBrowser
};

WebpackDevServer.addDevServerEntrypoints(config, options);

const compiler = webpack(config);
// 启动服务
new WebpackDevServer(compiler, options).listen(serverPort, sysConfig.dev.host, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`dev server on http://localhost:${serverPort}\n`);
    }
});

const viewPath = files.tplPath;
rm('-rf', viewPath);
// // 在源码有更新时，更新模板
compiler.plugin('emit', function (compilation, cb) {
    // console.log('compilation.assets = ', compilation.assets);
    for (const filename in compilation.assets) {
        if (filename.endsWith('.html')) {
            let filepath = path.resolve(viewPath, filename);
            let dirname = path.dirname(filepath);
            if (!fs.existsSync(dirname)) {
                mkdir('-p', dirname);
            }
            // console.log('compilation.assets[filename].source() = ', compilation.assets[filename].source());
            fs.writeFile(filepath, compilation.assets[filename].source(), (err) => {
                if (err) throw err;
            });
        }
    }
    cb();
});
