/**
 * 消息框msg组件
 * layui-layer-msg二次封装
 */
layui.define('layer', function (exports) {
    "use strict";
    var layer = layui.layer;
    // 定义组件
    var djcpsMsg = {
        // 初始配置
        config: {
            //宽高，auto自适应，500px为宽度500高度仍自适应
            area: "auto",
            //坐标，auto垂直水平居中，100px为top坐标100水平仍居中，['100px', '50px']为top、left坐标
            //快捷设置，t顶部居中，r右边缘居中，b底部居中，l左边缘居中，lt左上角，lb左下角，rt右上角，rb右下角
            offset: 'auto',
            //图标，显示在文字之前
            icon: -1,
            //关闭按钮，样式1或2，0为无关闭按钮
            closeBtn: 0,
            //遮罩，消息框外区域#000背景透明度，0为不遮罩，[0.8, '#393D49']可自定义遮罩颜色
            shade: 0,
            //是否通过点击遮罩来关闭消息框
            shadeClose: false,
            //自动关闭所需毫秒
            time: 3000,
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
     * @param {*} callback 回调函数，不带任何参数
     */
    var mainFn = function (content, options, callback) {
        var that = this;
        that.content = content === undefined ? '' : content;
        that.config = $.extend({}, djcpsMsg.config, options);
        that.callback = typeof callback === 'function' ? callback : undefined;
        that.loadHtml().then(function () {
            that.initMsg();
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#msgCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsMsg/djcpsMsg.html",
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
     * 初始化消息框功能
     */
    mainFn.prototype.initMsg = function () {
        var that = this;
        layer.msg(that.content, that.config, function () {
            if (typeof that.callback === "function") {
                that.callback();
            }
        });
    };
    //组件入口
    djcpsMsg.init = function (content, options, callback) {
        var inst = new mainFn(content, options, callback);
        return inst;
    };
    //输出组件
    exports('djcpsMsg', djcpsMsg);
});
