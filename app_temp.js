const express = require('express');
const fs = require('fs');
require('shelljs/global');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const merge = require('webpack-merge');
const sysConfig = require('./sysConfig');
const routes = require('./routes/index');

// 代理插件
const proxy = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const isDev = app.get('env') === 'development';

// todo cors将设置access-control-allow-origin:*,解决跨域问题( express proxy)
app.use(cors());

// view engine setup
const {artTemplateOption} = require('./lib/art-template.js');
app.engine('.html', require('express-art-template'));
app.set('view options', merge(artTemplateOption, {
    //todo 配置项确定
    extname: '.html'
}));

app.set('views', path.join(__dirname, sysConfig.dev.tplPath));
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sysConfig.dev.publicPath, express.static(sysConfig.dev.outPutPath));
// app.use(sysConfig.dev.publicPath, express.static(path.join(__dirname, 'dist/static')));

app.use('/', routes);

//ignore favicon.ico request
app.use(function (req, res, next) {
    if (req.url === '/favicon.ico') {
        console.log('ignore');
    } else {
        console.log(req.url);
        res.end();
    }
});

// 设置代理
app.use('/dj_server', proxy({
    // target: 'https://api.douban.com/',
    target: 'http://localhost:3999',
    pathRewrite: {'^/dj_server': ''},
    changeOrigin: true
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (isDev) {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.log(err);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

if (isDev) {
    const serverPort = 25999;
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackDevConfig = require('./webpack.temp.config.js');

    const compiler = webpack(webpackDevConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));
    app.use(webpackHotMiddleware(compiler));

    // browsersync is a nice choice when modifying only views (with their css & js)
    const bs = require('browser-sync').create();
    app.listen(sysConfig.dev.port, function () {
        bs.init({
            open: false,
            ui: false,
            notify: false,
            proxy: 'localhost:' + sysConfig.dev.port,
            files: ['./src/views/**'],
            serverPort: serverPort
        });
        console.log(`App (dev) is going to be running on port ${serverPort} (by browsersync).`);
    });

    var viewPath = path.join(__dirname, sysConfig.dev.tplPath);
    rm('-rf', viewPath);
    // 在源码有更新时，更新模板
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
} else {
    app.use(express.static(path.join(__dirname, 'public')));
    app.listen(sysConfig.dev.port, function () {
        console.log(`App (production) is now running on port ${sysConfig.dev.port}!`);
    });
}

module.exports = app;
