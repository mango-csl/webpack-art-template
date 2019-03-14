/**
 * 提示框alert组件
 * layui-layer-alert二次封装
 */
// $ = layui.jquery;
layui.define('layer', function (exports) {
    "use strict";
    var layer = layui.layer;
    // 定义组件
    var djcpsAlert = {
        // 初始配置
        config: {
            //标题，也可以设置标题样式 ['文本', 'font-size:18px;']，传false则不显示标题栏
            title: '提示',
            //样式类名，会加载提示框元素的最外层
            skin: 'cps-layer-alert',
            //宽高，auto自适应，500px为宽度500高度仍自适应
            area: "auto",
            //坐标，auto垂直水平居中，100px为top坐标100水平仍居中，['100px', '50px']为top、left坐标
            //快捷设置，t顶部居中，r右边缘居中，b底部居中，l左边缘居中，lt左上角，lb左下角，rt右上角，rb右下角
            offset: 'auto',
            //图标，显示在文字之前
            icon: -1,
            //关闭按钮，样式1或2，0为无关闭按钮
            closeBtn: 0,
            //遮罩，提示框外区域#000背景透明度，0为不遮罩，[0.8, '#393D49']可自定义遮罩颜色
            shade: 0.3,
            //是否通过点击遮罩来关闭提示框
            shadeClose: false,
            //是否固定在可视区域（鼠标滚动时）
            fixed: true,
            //是否允许浏览器出现滚动条
            scrollbar: true,
            //层叠顺序，一般用于解决和其他组件的层叠冲突
            zIndex: 19891014,
            //触发拖拽的元素，传元素选择器'.layui-layer-title'，传false禁止拖拽
            move: false
        }
    };
    /**
     * 核心功能构造函数
     * @param {*} content 内容
     * @param {*} options 配置项
     * @param {*} callback 回调函数，携带两个参数，分别为当前层索引index、当前层DOM对象layero
     */
    var mainFn = function (content, options, callback) {
        var that = this;
        that.content = content === undefined ? '' : content;
        that.config = $.extend({}, djcpsAlert.config, options);
        that.callback = typeof callback === 'function' ? callback : undefined;
        that.loadHtml().then(function () {
            that.initAlert();
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#alertCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsAlert/djcpsAlert.html",
                async: false,
                success: function (result) {
                    $('body').append(result);
                    defer.resolve();
                }
            });
        }
        return defer.promise();
    };
    /**
     * 初始化提示框功能
     */
    mainFn.prototype.initAlert = function () {
        var that = this;
        layer.alert(that.content, that.config, function (index, layero) {
            if (typeof that.callback === "function") {
                that.callback(index, layero);
            }
            layer.close(index);
        });
    };
    //组件入口
    djcpsAlert.init = function (content, options, callback) {
        var inst = new mainFn(content, options, callback);
        return inst;
    };
    //输出组件
    exports('djcpsAlert', djcpsAlert);
});
