const artTemplate = require('art-template');
const merge = require('webpack-merge');

let artTemplateOption = {
// whether to automatically encode output statements of template. Setting false will close that functionality
// escape can prevent XSS attacks
    escape: true,
// whether to enable caching
    cache: true,
// enable debug mode. If true: {cache:false, minimize:false, compileDebug:true}
    debug: process.env.NODE_ENV !== 'production',
// root directory of template. If filename field is not a local path, template will be found in root directory
    root: '/',
    imports: {
        // 日期格式化
        'dateFormat': function (date, format) {
            date = new Date(date);
            let map = {
                'M': date.getMonth() + 1, // 月份
                'd': date.getDate(), // 日
                'h': date.getHours(), // 小时
                'm': date.getMinutes(), // 分
                's': date.getSeconds(), // 秒
                'q': Math.floor((date.getMonth() + 3) / 3), // 季度
                'S': date.getMilliseconds() // 毫秒
            };
            format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
                let v = map[t];
                if (v !== undefined) {
                    if (all.length > 1) {
                        v = '0' + v;
                        v = v.substr(v.length - 2);
                    }
                    return v;
                } else if (t === 'y') {
                    return (date.getFullYear() + '').substr(4 - all.length);
                }
                return all;
            });
            return format;
        }
    }
};

let artTemplateRenderFn = function (ret, data, options = {}) {
    let mergeOption = merge(artTemplateOption, options);
    return artTemplate.render(ret, data, mergeOption);
};
module.exports = {
    artTemplateRenderFn,
    artTemplateOption
};
