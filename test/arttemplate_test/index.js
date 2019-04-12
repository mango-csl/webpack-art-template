const path = require('path');
const files = require('../../bin/config/files');
const {artTemplate, artTemplateOption, artTemplateRenderFn} = require('../../bin/lib/art-template');
const renderData = require('../../bin/dataSource/renderData');
// const html = artTemplate(path.resolve(files.htmlPath, 'index.html'), renderData['index'], artTemplateOption);
// const index_path = path.resolve(files.htmlPath, 'index.html');
const html = artTemplateRenderFn({
    ...artTemplateOption,
    filename: path.resolve(files.htmlPath, 'index.html')
}, renderData['index']);
console.log(html);
