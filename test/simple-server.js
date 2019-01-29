var express = require('express');
var app = express();

const merge = require('webpack-merge');
const {artTemplateOption} = require('../lib/art-template.js');

app.engine('art', require('express-art-template'));
app.set('view options', merge(artTemplateOption, {
    //todo
    // extname: 'html'
}));

app.get('/', function (req, res) {
    res.render('index.art', {
        title: 'a123123ui'
    });
});
var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);
    console.log('dev server on http://localhost:' + port + '\n');
});
