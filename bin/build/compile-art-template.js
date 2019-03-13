const {artTemplateRenderFn} = require('./lib/art-template');
const fs = require('fs');
const utils = require('./utils');
const files = require('../config/files');
require('shelljs/global');

const webTile = '各个页面统一title';
let renderData = {
    'index': {
        title: '首页 - ' + webTile,
        pageNav: 'index'
    },
    'about': {
        title: '首页 - ' + webTile,
        pageNav: 'about'
    },
    'error': {
        title: '错误 - ' + webTile,
        message: '错误message',
        error: {
            status: 'error status',
            stack: 'error stack'
        }
    }
};

//html模板所在页面
const tempaltePath = files.tplPath;
// 'dist/'
const outPutPath = files.buildPath;
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
        root: tempaltePath,
        extname: '.html'
        // imports: {
        //     outSide: function (name) {
        //         return 'outside' + name;
        //     }
        // }
    }, options));
};
const entries = utils.getEntry(tempaltePath + '/*.html', tempaltePath + '/', (value) => {
    return value;
});

for (let item of Object.keys(entries)) {
    let filePath = entries[item];
    fs.readFile(filePath, function (e, v) {
            let ret = v.toString();
            const template = nodeRenderFn(ret, renderData[item]);

            let dirname = outPutPath;
            if (!fs.existsSync(dirname)) {
                mkdir('-p', dirname);
            }
            const file_html = `${outPutPath}/${item}.html`;
            fs.writeFile(file_html, template, function (err) {
                console.log('build  ----- ', file_html);
                if (err) throw err;
            });
        }
    );
}

// rm('-rf', tempaltePath);
