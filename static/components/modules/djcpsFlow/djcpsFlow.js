/**
 * 流加载组件
 * layui-flow二次封装
 */
layui.define('flow', function (exports) {
    "use strict";
    var layflow = layui.flow;
    // 定义组件
    var djcpsFlow = {
        // 初始配置
        config: {
            // 流加载容器，传入dom对象如$('#layflow')
            elem: $('#layflow'),
            // 滚动条所在元素选择器，默认document。如果你不是通过窗口滚动来触发流加载，而是页面中的某一个容器的滚动条，那么通过该参数指定即可。。
            scrollElem: '',
            // 是否自动加载。默认true。如果设为false，点会在列表底部生成一个“加载更多”的button，则只能点击它才会加载下一页数据。
            isAuto: true,
            // 用于显示末页内容，可传入任意HTML字符。默认为：没有更多了
            end: '没有更多了',
            // 是否开启图片懒加载。默认false。如果设为true，则只会对在可视区域的图片进行按需加载。但与此同时，在拼接列表字符的时候，你不能给列表中的img元素赋值src，必须要用lay-src取代
            isLazyimg: false,
            // 与底部的临界距离，默认50。即当滚动条与底部产生该距离时，触发加载。注意：只有在isAuto为true时有效。
            mb: '150',
            // 到达临界点触发加载的回调。信息流最重要的一个存在。
            done: function (page, next) { }
        }
    };
    /**
     * 核心功能构造函数    options 为配置参数
     */
    var mainFn = function (options) {
        var that = this;
        that.config = $.extend({}, djcpsFlow.config, options);
        that.loadHtml().then(function () {
            that.initFlow();
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#flowCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsFlow/djcpsFlow.html",
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
     * 初始化流加载功能
     */
    mainFn.prototype.initFlow = function () {
        var that = this;
        layflow.load(that.config);
    };
    /**
     * 组件入口
     */
    djcpsFlow.init = function (options) {
        var inst = new mainFn(options);
        return inst;
    };
    /**
     * 输出组件
     */
    exports('djcpsFlow', djcpsFlow);
});
