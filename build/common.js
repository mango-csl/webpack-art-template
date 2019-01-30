'use strict';
var path = require('path');
var glob = require('glob');

exports.getEntry = function (globPath, pathDir) {
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
};
