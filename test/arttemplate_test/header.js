const path = require('path');
const files = require('../../bin/config/files');
const {artTemplate} = require('../../bin/lib/art-template');
const renderData = require('../../bin/dataSource/renderData');
const html = artTemplate(path.resolve(files.htmlPath, 'common/header.html'), renderData['about']);
console.log(html);
