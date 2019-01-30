var express = require('express');
var router = express.Router();

var webTile = '坑爹的API';
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.html', {
        title: '首页 - ' + webTile,
        pageNav: 'index'
    });
});

router.get('/about', function (req, res, next) {
    res.render('about.html', {
        title: '关于 - ' + webTile,
        pageNav: 'about'
    });
});

module.exports = router;
