// const artTemplate = require('art-template')
const path = require('path');
const {artTemplateRenderFn} = require('../../lib/art-template');
const fs = require('fs');
const common = require('../common');
const rootPath = path.join(__dirname, '../../');
const glob = require('glob');
var sysConfig = require('../../sysConfig');

require('shelljs/global');

const webTile = '各个页面统一title';
let renderData = {
    'index.html': {
        title: '首页 - ' + webTile,
        pageNav: 'index'
    },
    'about.html': {
        title: '首页 - ' + webTile,
        pageNav: 'about'
    },
    'error.html': {
        title: '错误 - ' + webTile,
        message: '错误message',
        error: {
            status: 'error status',
            stack: 'error stack'
        }
    }
};

//html模板所在页面
const tempaltePath = 'dist/' + sysConfig.dev.tplPath + '/';
const outPutPath = 'dist/';
// rm('-rf',  path.join(rootPath, outPutPath));
/**
 * node端html模板渲染函数
 * @param htmlToString
 * @param renderData
 * @param options
 * @returns {*}
 */
let nodeRenderFn = function (htmlToString, renderData, options) {
    return artTemplateRenderFn(htmlToString, renderData, Object.assign({}, {
        root: rootPath + tempaltePath,
        extname: '.html'
        // imports: {
        //     outSide: function (name) {
        //         return 'outside' + name;
        //     }
        // }
    }, options));
};
const entries = common.getEntry(path.join(rootPath, tempaltePath + '*.html'), path.join(rootPath, tempaltePath));

for (let item of Object.keys(entries)) {
    console.log('item  = ', item);
    console.log('entries(item)  = ', entries[item]);
    let filePath = entries[item];
    fs.readFile(filePath, function (e, v) {
            let ret = v.toString();
            const template = nodeRenderFn(ret, renderData[item]);

            let dirname = path.join(rootPath, outPutPath);
            if (!fs.existsSync(dirname)) {
                mkdir('-p', dirname);
            }
            fs.writeFile(path.join(rootPath, outPutPath + item), template, function (err) {
                if (err) throw err;
            });
        }
    );
}

// rm('-rf',  path.join(rootPath, tempaltePath));
