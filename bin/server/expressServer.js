const express = require('express');
// const fs = require('fs');
// require('shelljs/global');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const merge = require('webpack-merge');
const sysConfig = require('../config/index');
const files = require('../config/files');
const routes = require('./routes/index');

// 代理插件
const proxy = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
// const isDev = app.get('env') === 'development';

//cors将设置access-control-allow-origin:*,解决跨域问题( express proxy)
app.use(cors());

// view engine setup
const {artTemplateOption} = require('../build/lib/art-template.js');
app.engine('.html', require('express-art-template'));
app.set('view options', merge(artTemplateOption, {
    extname: '.html'
}));

app.set('views', files.tplPath);
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// app.locals.env = process.env.NODE_ENV || 'dev';

app.use('/', routes);

// 设置代理
app.use('/dj_server', proxy({
    // target: 'https://api.douban.com/',
    target: 'http://192.168.2.167:3999',
    pathRewrite: {'^/dj_server': ''},
    changeOrigin: true
}));

//ignore favicon.ico request
app.use(function (req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    // if (req.url === '/favicon.ico') {
    //     console.log('ignore /favicon.ico');
    // } else {
    //     res.end();
    // }
    res.end();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.render('error', {
        message: err.message,
        error: err
    });
});

const port = process.env.PORT || sysConfig.dev.expressPort;
app.use(sysConfig.dev.assetsPublicPath, express.static(files.buildPath));
// app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, function () {
    console.log(`App (production) is now running on port ${port}!`);
});
