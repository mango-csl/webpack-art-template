/**
 * 分页组件
 * layui-laypage二次封装
 */
layui.define('laypage', function (exports) {
    "use strict";
    var laypage = layui.laypage;
    // 定义组件
    var djcpsPage = {
        // 初始配置
        config: {
            // 容器，传入dom对象如$('#page')
            elem: $('#page'),
            // 数据总数
            count: 0,
            // 每页显示的条数
            limit: 10,
            // 每页条数的下拉框
            limits: [10, 20, 30, 40, 50],
            // 当前页，从1开始
            curr: 1,
            // 连续分页数
            groups: 4,
            // 上一页文字
            prev: '上一页',
            // 下一页文字
            next: '下一页',
            // 首页文字
            first: '首页',
            // 末页文字
            last: '末页',
            // 自定义排版：count总条数、prev上一页、page分页、next下一页、limit每页条数、refresh刷新、skip跳页
            layout: ['prev', 'page', 'next', 'skip'],
            // 自定义主题，会生成layui-laypage-xxx的css类
            theme: 'default',
            // 自定义hash值，在触发分页时，会自动对url追加hash的对应值，并在页面载入时就定位到指定页
            hash: false,
            // 页面切换时触发
            jump: function (obj, first) { },
            // 非layui原生配置项，控制单页时是否隐藏分页
            onePageHide: true
        }
    };
    /**
     * 核心功能构造函数
     * @param {*} options 配置项
     */
    var mainFn = function (options) {
        var that = this;
        that.config = $.extend({}, djcpsPage.config, options);
        that.loadHtml().then(function () {
            that.initPage();
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#pageCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsPage/djcpsPage.html",
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
     * 初始化分页功能
     */
    mainFn.prototype.initPage = function () {
        var that = this;
        // 无数据时不显示分页
        if (that.config.count === 0) {
            that.config.elem.hide();
        }
        // 配置了单页隐藏 且 不显示每页条数下拉框 且 总页数为1时，也不显示分页
        else if (that.config.onePageHide && that.config.layout.join(',').indexOf('limit') < 0 && Number(that.config.count) / Number(that.config.limit) <= 1) {
            that.config.elem.hide();
        } else {
            that.config.elem.show();
        }
        laypage.render(that.config);
    };
    //组件入口
    djcpsPage.init = function (options) {
        var inst = new mainFn(options);
        return inst;
    };
    //输出组件
    exports('djcpsPage', djcpsPage);
});
