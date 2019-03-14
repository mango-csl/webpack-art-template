/**
 * 轮播组件
 * layui-carousel二次封装
 */
layui.define(['carousel', 'laytpl'], function (exports) {
    "use strict";
    var laytpl = layui.laytpl;
    var carousel = layui.carousel;
    // 定义组件
    var djcpsCarousel = {
        // 初始配置
        config: {
            //非layui原生配置，外部容器元素，传入jquery的dom对象
            container: $('#carousel'),
            //非layui原生配置，用于组件区分标识（过滤器）
            filter: 'carousel',
            //设置内部容器宽度
            width: '100%',
            //设置内部容器高度
            height: '100%',
            //是否全屏轮播
            full: false,
            //轮播切换方式，default左右切换，updown上下切换，fade渐隐渐显切换
            anim: 'default',
            //是否自动切换
            autoplay: true,
            //自动切换的时间间隔，单位ms，不能低于800
            interval: 3000,
            //非layui原生配置，滑动时间
            speed: 0,
            //初始开始的条目索引
            index: 0,
            //切换箭头显示状态，hover悬停显示，always始终显示，none始终不显示
            arrow: 'hover',
            //指示器位置，inside容器内部，outside容器外部，none不显示
            indicator: 'inside',
            //指示器的触发事件
            trigger: 'click',
            //非layui原生配置，轮播数据
            data: [],
            //非layui原生配置，轮播数据相关配置
            options: {
                //轮播类型，img图片轮播，text文字轮播，custom自定义html片段轮播
                type: 'img',
                //轮播字段，图片轮播为图片字段，文字轮播为文字字段
                prop: 'src',
                //自定义轮播的html模板
                customHtml: '',
                //替代图片，当图片无法显示的时候可以设置替代图片
                errorSrc: ''
            },
            //非layui原生配置，切换内容时的回调函数
            change: function (obj) { }
        }
    };
    /**
     * 核心功能构造函数
     * @param {*} options 配置项
     */
    var mainFn = function (options) {
        var that = this;
        that.config = $.extend({}, djcpsCarousel.config, options);
        that.loadHtml().then(function () {
            return that.renderHtml();
        }).then(function () {
            that.initCarousel();
            //轮播切换时的监听事件
            //obj包含index当前条目索引，prevIndex上一个条目索引，item当前条目的元素对象
            carousel.on('change(' + that.config.filter + ')', function (obj) { //test1来源于对应HTML容器的 lay-filter="test1" 属性值
                if (typeof that.config.change === 'function') {
                    that.config.change(obj);
                }
            });
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#carouselCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsCarousel/djcpsCarousel.html",
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
            options: that.config.options,
            data: that.config.data
        };
        var tpl = $('#carouselTpl').html();
        laytpl(tpl).render(data, function (html) {
          that.config.container.html(html);
            //如果有图片轮播，且图片加载失败，则用备用替代图片
          if (that.config.container.find('img').length && that.config.options.errorSrc) {
            that.config.container.find('img').error(function () {
              console.log('err');
              $(this).attr('src', that.config.options.errorSrc);
                });
            }
            defer.resolve();
            $('.layui-carousel>[carousel-item]>*').css("transition-duration",that.config.speed+'s');
          console.log('transition');
        });
        return defer.promise();
    };
    /**
     * 初始化轮播功能
     */
    mainFn.prototype.initCarousel = function () {
        var that = this;
        that.config.elem = that.config.container.find('.carouselContent');
        that.carousel = carousel.render(that.config);
    };
    /**
     * 重置轮播功能
     */
    mainFn.prototype.reload = function () {
        var that = this;
        if (that.carousel) {
            that.carousel.reload(that.config);
        }
    };
    //组件入口
    djcpsCarousel.init = function (options) {
        var inst = new mainFn(options);
        return inst;
    };

    //输出组件
    exports('djcpsCarousel', djcpsCarousel);
});
