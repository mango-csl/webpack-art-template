const express = require('express');
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
app.use('*', proxy({
    // target: 'https://api.douban.com/',
    target: 'http://192.168.2.167:3000',
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
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        console.log(err);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// const server = app.listen(8081, function () {
//
//     const host = server.address().address;
//     const port = server.address().port;
//
//     console.log('dev server on http://localhost:' + port + '\n');
// });

module.exports = app;
