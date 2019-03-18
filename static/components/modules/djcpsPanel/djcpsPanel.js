/**
 * 面板组件
 */
layui.define(['element', 'laytpl'], function (exports) {
    "use strict";
    var laypanel = layui.element;
    var laytpl = layui.laytpl;
    var djcpsPanel = {
        // 初始配置
        config: {
            // 需要点击展开或折叠的按钮的id
            elem: '#laypanel',
            //非layui原生配置，外部容器元素，传入jquery的dom对象
            container: $('#panel'),
            // 按钮默认命名
            buttonName: '批量展开',
            // 点击按钮后的命名
            buttonAfterName: '批量折叠',
            // 是否开启手风琴
            layAccordion: false,
            //数据
            data: [
                {
                    'title': '',//被点击的参数
                    'content': ''//被隐藏的部分
                }
            ]
        }
    };
    /**
     * 核心功能构造函数
     */
    var mainFn = function (options) {
        var that = this;
        that.config = $.extend({}, djcpsPanel.config, options);
        that.loadHtml().then(function () {
            return that.renderHtml();
        }).then(function () {
            that.initPanel();
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#panelCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsPanel/djcpsPanel.html",
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
        var data = {
            layAccordion: that.config.layAccordion,
            data: that.config.data
        };
        var tpl = $('#panelTpl').html();
        laytpl(tpl).render(data, function (html) {
            that.config.container.html(html);
            defer.resolve();
        });
        return defer.promise();
    };
    /**
     * 初始化功能
     */
    mainFn.prototype.initPanel = function () {
        var that = this;
        var elem = that.config.elem;
        var buttonName = that.config.buttonName;
        var buttonAfterName = that.config.buttonAfterName;
        laypanel.init(that.config);
        $(elem).click(function () {
            $(elem).html() == buttonName ? $(elem).html(buttonAfterName) : $(elem).html(buttonName);
            $(elem).html() == buttonName ? $('.layui-icon').html('&#xe602;') : $('.layui-icon').html('&#xe61a;');
            $(elem).html() == buttonName ? $('.layui-colla-content').removeClass('layui-show') : $('.layui-colla-content').addClass('layui-show');
        });
        $('.layui-colla-title').click(function () {
            var len = $('.layui-colla-content').length;
            var lens = $(".layui-show").length;
            if (len == lens) {
                $(elem).html(buttonAfterName)
            } else if (lens == 0) {
                $(elem).html(buttonName)
            }
        });
    };
    /**
     * 组件入口
     */
    djcpsPanel.init = function (options) {
        var inst = new mainFn(options);
        return inst;
    };
    /**
     * 输出组件
     */
    exports('djcpsPanel', djcpsPanel);
});
