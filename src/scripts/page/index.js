// 引入css
require('../../styles/lib/reset.css');
require('../../styles/common/global.css');
require('../../styles/common/grid.css');
require('../../styles/common/common.less');
require('../../styles/page/index.less');

var oP = document.createElement('p');
oP.className = 'text';
oP.innerHTML = '这是由js生成的一句话。';
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
ajax('https://api.douban.com/v2/music/search?q=周杰伦');
function ajax(url) {
    var xml = new XMLHttpRequest();

    xml.open('GET', url, true);

    xml.onreadystatechange = function () {
        if (xml.readyState == 4 && xml.status == 200) {
            // console.log(JSON.parse(xml.responseText));
            console.log(xml.responseText);
        }
    };

    xml.send();
}

// 作者：Elephant被注册了
// 链接：https://juejin.im/post/5a0d02326fb9a0451170adbb
//     来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

function getTest() {
    // const native = new XMLHttpRequest();
    // native.open("POST", "/djwmsser");
    // // native.open("POST", "http://192.168.2.167:3000/test");
    // native.send();
    // native.onreadystatechange = function () {
    //     if (native.readyState === 4 && native.status === 200) {
    //         console.log('native.response = ', native.response);
    //     } else {
    //         console.log(native.status);
    //     }
    // };

    $.ajax({
        type: "post",
        // url: "http://192.168.2.167:3000/test",
        url: "/test",
        dataType: "json",
        success: function (data) {
            console.log('success = ', data);
        },
        error: function (err) {
            console.log('error = ', err);
        }
    });
    // ---------------------
    //     作者：wopelo
    // 来源：CSDN
    // 原文：https://blog.csdn.net/wopelo/article/details/79802585
    //     版权声明：本文为博主原创文章，转载请附上博文链接！
}

function github_test() {
    var native = new XMLHttpRequest();
    native.open("GET", "https://api.github.com/");
    native.send();
    native.onreadystatechange = function () {
        if (native.readyState == 4 && native.status == 200) {
            console.log(native.response);
        } else {
            console.log(native.status);
        }
    };
    // ---------------------
    //     作者：wopelo
    // 来源：CSDN
    // 原文：https://blog.csdn.net/wopelo/article/details/79802585
    //     版权声明：本文为博主原创文章，转载请附上博文链接！
}
