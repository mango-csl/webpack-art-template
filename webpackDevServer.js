const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./build/webpack.temp.config');
const sysConfig = require('./sysConfig');
require('shelljs/global');

let expressPort = sysConfig.dev.expressPort || 24999;
let serverPort = sysConfig.dev.serverPort || 2082;

const options = {
    publicPath: '/',
    hot: true,
    port: serverPort,
    host: sysConfig.dev.host,
    proxy: {
        '*': 'http://localhost:' + expressPort
    }
    // open: sysConfig.dev.autoOpenBrowser
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

const viewPath = path.join(__dirname, sysConfig.dev.tplPath);
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
//
// // 当页面模板有改变时，强制刷新页面
// compiler.plugin('compilation', function (compilation) {
//     compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//         // todo 刷新浏览器
//         /**
//          * 实际项目中，应该使用webpack-dev-middleware和webpack-hot-middleware中间件，
//          * 结合node库express/koa等使用。
//          */
//         cb();
//     });
// });
