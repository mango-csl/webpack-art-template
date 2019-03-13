'use strict';
const path = require('path');
const config = require('../config/index');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
// const packageConfig = require('../package.json');

/**
 * path 转成 posix 规范
 * @param _path
 * @returns {*}
 */
exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path);
};
exports.cssLoaders = function (options) {
    options = options || {};

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        // todo 暂时移除postcssLoader
        // const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
        const loaders = [cssLoader];
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        // if (options.extract) {
        return ExtractTextPlugin.extract({
            use: loaders
            // fallback: 'vue-style-loader'
        });
        // } else {
        //     return ['vue-style-loader'].concat(loaders);
        // }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        // postcss: generateLoaders(),
        less: generateLoaders('less')
        // sass: generateLoaders('sass', {indentedSyntax: true}),
        // scss: generateLoaders('sass'),
        // stylus: generateLoaders('stylus'),
        // styl: generateLoaders('stylus')
    };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    const output = [];
    const loaders = exports.cssLoaders(options);

    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        });
    }

    return output;
};

/**
 * 遍历项目文件，获取入口js，用于生成多页入口
 * @param globPath
 * @param pathDir
 * @param formatFn 自定义内容格式
 */
exports.getEntry = function (globPath, pathDir, formatFn) {
    const files = glob.sync(globPath);
    const entries = {};
    let {entry, dirname, basename, pathname, extname} = {};

    for (let i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.normalize(path.join(dirname, basename));
        pathDir = path.normalize(pathDir);
        if (pathname.startsWith(pathDir)) {
            pathname = pathname.substring(pathDir.length);
        }
        entries[pathname] = formatFn ? formatFn(entry) : ['./' + entry];
    }
    return entries;
};
