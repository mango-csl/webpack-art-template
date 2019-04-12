const path = require('path');
const config = require('../config/index');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const packageConfig = require('../../package.json');
const files = require('../config/files');
const portfinder = require('portfinder');
const cssLoaders = function (options) {
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
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
        // const loaders = [cssLoader];
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
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'style-loader'
            });
        } else {
            return ['style-loader'].concat(loaders);
        }
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
module.exports = {
    /**
     * path 转成 posix 规范
     * @param _path
     * @returns {*}
     */
    assetsPath: function (_path) {
        const assetsSubDirectory = process.env.NODE_ENV === 'production'
            ? config.build.assetsSubDirectory
            : config.dev.assetsSubDirectory;
        return path.posix.join(assetsSubDirectory, _path);
    },
// Generate loaders for standalone style files (outside of .vue)
    styleLoaders: function (options) {
        const output = [];
        const loaders = cssLoaders(options);

        for (const extension in loaders) {
            const loader = loaders[extension];
            output.push({
                test: new RegExp('\\.' + extension + '$'),
                use: loader
            });
        }

        return output;
    },

    /**
     * 遍历项目文件，获取入口js，用于生成多页入口
     * @param globPath
     * @param pathDir
     * @param formatFn 自定义内容格式
     */
    getEntry: function (globPath, pathDir, formatFn) {
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
            entries[pathname] = formatFn ? formatFn(entry) : [entry];
        }
        return entries;
    }, createNotifierCallback: () => {
        const notifier = require('node-notifier');

        return (severity, errors) => {
            if (severity !== 'error') return;

            const error = errors[0];
            const filename = error.file && error.file.split('!').pop();

            notifier.notify({
                title: packageConfig.name,
                message: severity + ': ' + error.name,
                subtitle: filename || '',
                icon: files.faviconPath
            });
        };
    },
    /**
     * 获取端口，防止出现已设端口被占用情况
     * @param basePort
     * @returns {Promise<any>}
     */
    getPort: (basePort) => {
        return new Promise((resolve, reject) => {
            portfinder.basePort = basePort;
            portfinder.getPort((err, serverPort) => {
                if (err) {
                    reject(err);
                } else {
                    // publish the new Port, necessary for e2e tests
                    process.env.PORT = serverPort;
                    resolve(serverPort);
                }
            });
        });
    }
};
