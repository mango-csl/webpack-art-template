// const artTemplate = require('art-template')
const path = require('path');
const {artTemplateRenderFn} = require('./lib/art-template');
const fs = require('fs');
// const common = require('../common');
const rootPath = path.join(__dirname, '../../');
const glob = require('glob');

require('shelljs/global');

// const entries = common.getEntry('src/views/**/*.html', 'src/views/');
const entries = getEntry('src/views/**/*.html', 'src/views/');

for (let item of Object.keys(entries)) {
    console.log('item  = ', item);
    console.log('entries(item)  = ', entries[item]);
}
let filePath = path.join(rootPath, 'src/views/about.html');
fs.readFile(filePath, function (e, v) {
        let ret = v.toString();
        const data = {
            title: '关于 - about',
            pageNav: 'about'
        };
        const template = artTemplateRenderFn(ret, data, {
            root: rootPath + 'src/views',
            extname: '.html'
            // imports: {
            //     outSide: function (name) {
            //         return 'outside' + name;
            //     }
            // }
        });

        let dirname = path.dirname(filePath);
        if (!fs.existsSync(dirname)) {
            mkdir('-p', dirname);
        }
        fs.writeFile(path.join(rootPath, '/compileViews/about.html'), template, function (err) {
            if (err) throw err;
        });
    }
);

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.normalize(path.join(dirname, basename));
        pathDir = path.normalize(pathDir);
        if (pathname.startsWith(pathDir)) {
            pathname = pathname.substring(pathDir.length);
        }
        entries[pathname] = ['./' + entry];
    }
    return entries;
}
