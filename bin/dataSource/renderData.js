const webTile = '各个页面统一title';
const commonData = {
    headerList: {
        index: '首页',
        about: '关于',
        login: '登陆'
    }
};

const renderData = ((_baseData) => {
    for (let key of Object.keys(_baseData)) {
        _baseData[key] = Object.assign({}, commonData, _baseData[key]);
    }
    return _baseData;
})({
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
    },
    'login': {
        title: '登陆 - ' + webTile,
        pageNav: 'login'
    }
});
module.exports = renderData;
