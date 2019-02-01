var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var merge = require('webpack-merge');
var sysConfig = require('./sysConfig');
//todo
var routes = require('./routes/index');

var app = express();

// view engine setup
var {artTemplateOption} = require('./lib/art-template.js');
app.engine('.html', require('express-art-template'));
app.set('view options', merge(artTemplateOption, {
    //todo
    extname: '.html'
}));
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

//todo
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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
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

// var server = app.listen(8081, function () {
//
//     var host = server.address().address;
//     var port = server.address().port;
//
//     console.log('dev server on http://localhost:' + port + '\n');
// });

module.exports = app;
