// todo 首屏加载优化，先渲染主框架
// 引入css
require('../../styles/base/index.less');
require('../../styles/page/index.less');

var oP = document.createElement('p');
oP.className = 'text';
oP.innerHTML = '这是由js生成的一句话。123123';
document.querySelector('.g-bd').appendChild(oP);

/* eslint-disable no-undef */
// 增加事件
$('#dialog').click(function () {
    require(['../components/dialog/index.js'], function (dialog) {
        dialog();
    });
});
$('#http').click(function () {
    getTest();
    // ajax('https://api.douban.com/v2/music/search?q=周杰伦');
});
getTest();

function getTest() {
    $.ajax({
        type: "post",
        // url: "http://192.168.2.167:3000/test",
        url: "/dj_server/test",
        dataType: "json",
        success: function (data) {
            console.log('success = ', data);
        },
        error: function (err) {
            console.log('error = ', err);
        }
    });
}

