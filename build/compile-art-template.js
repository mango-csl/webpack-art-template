// const artTemplate = require('art-template')
const path = require('path');
const {artTemplateRender} = require('../lib/art-template');
const fs = require('fs');
const glob = require('glob');
fs.readFile(path.join(__dirname, '../src/views/error.html'), function (e, v) {
        let ret = v.toString();
        const data = {
            message: 'niefengjun.cn 我是template生成的',
            error: {
                status: '404',
                stack: '8000'
            }
        };
        const template = artTemplateRender(ret, data, {
            imports: {
                outSide: function (name) {
                    return 'outside' + name;
                }
            }
        });
        fs.writeFile(path.join(__dirname, '../dist/error.html'), template, function (err) {
            if (err) throw err;
        });
    }
);
