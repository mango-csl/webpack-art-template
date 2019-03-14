/**
 * 信息框tips组件
 * layui-layer-tips二次封装
 */
layui.define('layer', function (exports) {
    "use strict";
    var layer = layui.layer;
    // 定义组件
    var djcpsTips = {
        // 初始配置
        config: {
            //宽高，auto自适应，500px为宽度500高度仍自适应
            area: "auto",
            //坐标，auto垂直水平居中，100px为top坐标100水平仍居中，['100px', '50px']为top、left坐标
            //快捷设置，t顶部居中，r右边缘居中，b底部居中，l左边缘居中，lt左上角，lb左下角，rt右上角，rb右下角
            offset: 'auto',
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
            move: false,
            //tips的方向和颜色，上1右2下3左4，也可以使用[1, '#c00']来定义颜色
            tips: 2,
            //是否允许多个tips
            tipsMore: false
        }
    };
    /**
     * 核心功能构造函数
     * @param {*} content 内容
     * @param {*} follow 跟随元素，传入jquery的dom对象
     * @param {*} options 配置项
     */
    var mainFn = function (content, follow, options) {
        var that = this;
        that.content = content === undefined ? '' : content;
        that.follow = follow;
        that.config = $.extend({}, djcpsTips.config, options);
        that.loadHtml().then(function () {
            that.initTips();
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#tipsCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsTips/djcpsTips.html",
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
    mainFn.prototype.initTips = function () {
        var that = this;
        layer.tips(that.content, that.follow, that.config);
    };
    //组件入口
    djcpsTips.init = function (content, follow, options) {
        var inst = new mainFn(content, follow, options);
        return inst;
    };
    //输出组件
    exports('djcpsTips', djcpsTips);
});
