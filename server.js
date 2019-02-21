const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config');
const sysConfig = require('./sysConfig');
const merge = require('webpack-merge');
require('shelljs/global');

const serverPort = 24999;

const exec = require('child_process').exec;
const cmdStr = `cross-env PORT=${serverPort} supervisor ./bin/www`;

exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
        console.error('err = ', err);
    } else {
        console.log('stdout = ', stdout);
    }
});

//todo webpack/hot/dev-server？
// for (const i in config.entry) {
//     config.entry[i].unshift('webpack-dev-server/client?http://localhost:' + sysConfig.dev.port, 'webpack/hot/dev-server');
// }
config.plugins.push(new webpack.HotModuleReplacementPlugin());

const options = {
    contentBase: './dist',
    publicPath: sysConfig.dev.publicPath + '/',
    hot: true,
    port: sysConfig.dev.port,
    host: sysConfig.dev.host,
    proxy: {
        '*': 'http://localhost:' + serverPort
    }
    // open: sysConfig.dev.autoOpenBrowser
};

WebpackDevServer.addDevServerEntrypoints(config, options);

const compiler = webpack(config);
// 启动服务
new WebpackDevServer(compiler, options).listen(sysConfig.dev.port, sysConfig.dev.host, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`dev server on http://${sysConfig.dev.host}:${sysConfig.dev.port}\n`);
    }
});

// const viewPath = path.join(__dirname, sysConfig.dev.tplPath);
// rm('-rf', viewPath);
// // // 在源码有更新时，更新模板
// compiler.plugin('emit', function (compilation, cb) {
//     // console.log('compilation.assets = ', compilation.assets);
//     for (const filename in compilation.assets) {
//         if (filename.endsWith('.html')) {
//             let filepath = path.resolve(viewPath, filename);
//             let dirname = path.dirname(filepath);
//             if (!fs.existsSync(dirname)) {
//                 mkdir('-p', dirname);
//             }
//             // console.log('compilation.assets[filename].source() = ', compilation.assets[filename].source());
//             fs.writeFile(filepath, compilation.assets[filename].source(), (err) => {
//                 if (err) throw err;
//             });
//         }
//     }
//     cb();
// });
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
