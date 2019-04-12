/**
 * 加载层load组件
 * layui-layer-load二次封装
 */
layui.define('layer', function (exports) {
    "use strict";
    var layer = layui.layer;
    // 定义组件
    var djcpsLoad = {
        // 初始配置
        config: {
            //样式类名，会加载加载层元素的最外层
            skin: 'cps-layer-load',
            //宽高，auto自适应，500px为宽度500高度仍自适应
            area: "auto",
            //坐标，auto垂直水平居中，100px为top坐标100水平仍居中，['100px', '50px']为top、left坐标
            //快捷设置，t顶部居中，r右边缘居中，b底部居中，l左边缘居中，lt左上角，lb左下角，rt右上角，rb右下角
            offset: 'auto',
            //遮罩，加载层外区域#000背景透明度，0为不遮罩，[0.8, '#393D49']可自定义遮罩颜色
            shade: 0.3,
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
     * @param {*} type 图标类型，可选0,1,2
     * @param {*} options 配置项
     */
    var mainFn = function (type, options) {
        var that = this;
        that.type = type !== undefined ? type : 1;
        that.config = $.extend({}, djcpsLoad.config, options);
        that.loadHtml().then(function () {
            that.initLoad();
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#loadCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsLoad/djcpsLoad.html",
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
     * 初始化加载层功能
     */
    mainFn.prototype.initLoad = function () {
        var that = this;
        that.load = layer.load(that.type, that.config);
    };
    /**
     * 关闭加载层
     */
    mainFn.prototype.close = function () {
        var that = this;
        if(that.load) {
            layer.close(that.load);
        } else {
            setTimeout(function() {
                that.close();
            }, 50);
        }
        
    };
    //组件入口
    djcpsLoad.init = function (type, options) {
        var inst = new mainFn(type, options);
        return inst;
    };
    //输出组件
    exports('djcpsLoad', djcpsLoad);
});
