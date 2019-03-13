const path = require('path');
/**
 * 各类资源的路径，加入绝对路径保证各个层级的文件引用正常
 */
module.exports = ((filesName) => {
    const files = filesName;
    // const appPath = path.resolve(files.root, files.appName);
    // files.appPath = appPath;

    // files.dllPath = path.resolve(files.root, `${files.buildName}/dll`);
    // files.jsPath = path.resolve(appPath, files.jsName);
    // files.cssPath = path.resolve(appPath, files.cssName);
    // files.imgPath = path.resolve(appPath, files.imgName);
    // files.fontPath = path.resolve(appPath, files.fontName);
    // files.viewPath = path.resolve(appPath, files.viewName);
    // files.testPath = path.resolve(appPath, files.testName);
    // files.htmlPath = path.resolve(appPath, files.htmlName);\
    // files.componentPath = path.resolve(appPath, files.componentName);
    const rootPath = path.join(__dirname, '../../');
    files.appPath = path.resolve(rootPath, `src`);
    files.rootPath = rootPath;
    files.staticPath = path.resolve(rootPath, files.staticName);
    files.tplPath = path.resolve(rootPath, files.tplName);
    files.buildPath = path.resolve(rootPath, files.buildName);
    files.faviconPath = path.resolve(rootPath, files.faviconName);
    return files;
})({
    // root: process.cwd(), // 根目录
    faviconName: 'favicon.ico',
    buildName: 'dist', // 打包文件
    // componentName: 'component', // 公共组件文件
    // htmlName: 'html', // 视图文件
    // cssName: 'source/css', // 公共样式文件
    // fontName: 'source/font', // 公共字体文件
    // imgName: 'source/img', // 公共图片文件
    // jsName: 'source/js', // 公共脚本文件
    staticName: 'static', // 静态资源包文件
    tplName: 'temp_views', // 视图模板文件
    testName: 'test' // 测试文件
});
