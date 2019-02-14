var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
var sysConfig = require('./sysConfig');

require('shelljs/global');

var serverPort = 24999;
var devPort = 2082;

var exec = require('child_process').exec;
var cmdStr = 'cross-env PORT=' + serverPort + ' supervisor ./bin/www';
// var cmdStr = 'cross-env supervisor ./bin/www'

exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
        console.error('err = ', err);
    } else {
        console.log('stdout = ', stdout);
    }
});

//todo
// for (var i in config.entry) {
//     config.entry[i].unshift('webpack-dev-server/client?http://localhost:' + devPort, 'webpack/hot/dev-server');
// }
config.plugins.push(new webpack.HotModuleReplacementPlugin());

var proxy = {
    '*': 'http://localhost:' + serverPort
};

var compiler = webpack(config);
// 启动服务
var app = new WebpackDevServer(compiler, {
    publicPath: sysConfig.dev.publicPath + '/',
    hot: true,
    proxy: proxy
});
app.listen(devPort, function () {
    console.log('dev server on http://localhost:' + devPort + '\n');
});

var viewPath = path.join(__dirname, sysConfig.dev.tplPath);
rm('-rf', viewPath);
// // 在源码有更新时，更新模板
compiler.plugin('emit', function (compilation, cb) {
    // console.log('compilation.assets = ', compilation.assets);
    for (var filename in compilation.assets) {
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

// 当页面模板有改变时，强制刷新页面
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // todo 刷新浏览器
        /**
         * 实际项目中，应该使用webpack-dev-middleware和webpack-hot-middleware中间件，
         * 结合node库express/koa等使用。
         */
        cb();
    });
});
