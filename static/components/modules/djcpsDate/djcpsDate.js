// 日期与时间选择组件，基于layui-laydate二次封装
layui.define(['laydate', 'laytpl'], function (exports) {
    'use strict';
    // 引用layui的自带日期和时间选择
    var laydate = layui.laydate;
    var laytpl = layui.laytpl;
    // 定义组件
    var djcpsDate = {
        // 默认配置
        config: {
            // 外部容器元素，传入jquery的dom对象
            container: $('#date'),
            // 时间控件的id
            id: 'dateContent',
            // 时间控件的placeholder
            placeholder: '',
            // 时间控件是否禁用
            disabled: false,
            // 控件类型，支持：date日期选择器/year年选择器/month年月选择器/time时间选择器/datetime日期时间选择器
            type: 'date',
            // 是否开启范围选择，即双控件
            range: false,
            // 默认日期格式，如：yyyy-MM-dd HH:mm:ss、yyyy年MM月dd日 HH时mm分ss秒
            format: 'yyyy-MM-dd',
            // 默认日期，支持传入new Date()，或者符合format参数设定的日期格式字符
            value: null,
            // 用于控制是否自动向元素填充初始值（需配合 value 参数使用）
            isInitValue: true,
            // 有效最小日期，年月日必须用“-”分割，时分秒必须用“:”分割。注意：它并不是遵循 format 设定的格式。
            min: '1900-1-1',
            //有效最大日期，同上
            max: '2099-12-31',
            // 呼出控件的事件，默认focus，如果绑定的元素非输入框，可改为click
            trigger: 'focus',
            // 是否直接显示，如果设置true，则默认直接显示控件
            show: false,
            // 是否显示底部栏
            showBottom: true,
            // 右下角显示的按钮，会按照数组顺序排列
            btns: ['clear', 'now', 'confirm'],
            // 语言，只支持cn/en，即中文和英文
            lang: 'cn',
            // 主题，分别有concise简洁风格，default默认风格，grid格子主题，molv墨绿背景主题，#393D49自定义背景色主题
            theme: 'default',
            // 控件定位方式定位, 默认absolute，支持：fixed/absolute/static
            position: null,
            // 是否开启公历重要节日，仅支持中文版
            calendar: false,
            // 日期备注，如重要事件或活动标记
            mark: {},
            // 控件层叠顺序
            zIndex: null,
            // 控件在打开时触发，返回参数date为初始的日期时间对象
            ready: function (date) { },
            // 控件选择完毕后的回调，点击清空/现在/确定也均会触发
            // 返回参数value为生成的值、date为日期时间对象、endDate为结束的日期时间对象
            done: function (value, date, endDate) { },
            // 日期时间改变后的回调，切换上页下页、选择年月时触发
            // 返回参数value为生成的值、date为日期时间对象、endDate为结束的日期时间对象
            change: function (value, date, endDate) { }
        }
    };
    /**
     * 核心功能构造函数
     * @param {*} options 配置项
     */
    var mainFn = function (options) {
        var that = this;
        // 合并默认配置，生成新的配置
        that.config = $.extend({}, djcpsDate.config, options);
        that.loadHtml().then(function () {
            return that.renderHtml();
        }).then(function () {
            that.initDate();
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#dateCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsDate/djcpsDate.html",
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
            id: that.config.id,
            placeholder: that.config.placeholder,
            disabled: that.config.disabled
        };
        var tpl = $('#dateTpl').html();
        laytpl(tpl).render(data, function (html) {
            that.config.container.html(html);
            defer.resolve();
        });
        return defer.promise();
    };
    // 初始化日期与时间选择
    mainFn.prototype.initDate = function () {
        var that = this;
        that.config.elem = '#' + that.config.id;
        laydate.render(that.config);
    };
    // 组件入口
    djcpsDate.init = function (options) {
        return new mainFn(options);
    };
    // 输出组件
    exports('djcpsDate', djcpsDate);
});
