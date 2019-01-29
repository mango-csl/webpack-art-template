var express = require('express');
var router = express.Router();
const path = require('path');

var webTile = '坑爹的API';
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.html', {
        title: '首页 - ' + webTile
    });
});

module.exports = router;
