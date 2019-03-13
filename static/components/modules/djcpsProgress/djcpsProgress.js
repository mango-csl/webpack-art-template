/**
 * 进度条progress组件
 * layui-element-progress二次封装
 */
layui.define(['element', 'laytpl'], function (exports) {
    "use strict";
    var element = layui.element;
    var laytpl = layui.laytpl;
    // 定义组件
    var djcpsProgress = {
        // 初始配置
        config: {
            //非layui原生配置，外部容器元素，传入jquery的dom对象
            container: $('#progress'),
            //非layui原生配置，用于组件区分标识（过滤器）
            filter: 'progress',
            //非layui原生配置，是否显示进度条的值
            showPercent: false,
            //非layui原生配置，进度条的值，可以传10%、1/3、50（表示像素）等值
            percent: '0%',
            //非layui原生配置，是否显示大号进度条
            bigProgress: false
        }
    };
    /**
     * 核心功能构造函数
     * @param {*} options 配置项
     */
    var mainFn = function (options) {
        var that = this;
        that.config = $.extend({}, djcpsProgress.config, options);
        that.loadHtml().then(function () {
            return that.renderHtml();
        }).then(function () {
            that.setProgress();
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#progressCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsProgress/djcpsProgress.html",
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
     * 渲染模板文件
     */
    mainFn.prototype.renderHtml = function () {
        var that = this;
        var defer = $.Deferred();
        //整合模板数据
        var data = {
            filter: that.config.filter,
            showPercent: that.config.showPercent,
            percent: that.config.percent,
            bigProgress: that.config.bigProgress
        };
        var tpl = $('#progressTpl').html();
        laytpl(tpl).render(data, function (html) {
            that.config.container.html(html);
            defer.resolve();
        });
        return defer.promise();
    };
    /**
     * 设置进度条长度
     */
    mainFn.prototype.setProgress = function (filter, percent) {
        var that = this;
        setTimeout(function () {
            element.progress(filter || that.config.filter, percent || that.config.percent);
        }, 50);
    };
    //组件入口
    djcpsProgress.init = function (options) {
        var inst = new mainFn(options);
        return inst;
    };
    //输出组件
    exports('djcpsProgress', djcpsProgress);
});
