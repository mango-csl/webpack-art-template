var path = require('path');
var sysConfig = require('../sysConfig')
console.log('path.join(__dirname, \'dist/static\')' + ' = ', path.join(__dirname, '../dist/static'));
console.log('path.resolve(__dirname, \'dist/static\')' + ' = ', path.resolve(__dirname, '../dist/static'));
console.log('sysConfig' + ' = ', sysConfig.dev.assetsRoot,sysConfig.dev.publicPath);
// let root = __dirname;
// function log(Fn) {
//     console.log(Fn + ' = ', _eval(Fn, 'string', {path: path, __dirname: root}));
// }
//
// log('path.join(__dirname, \'dist/static\')');
// log('path.resolve(__dirname, \'dist/static\')');
