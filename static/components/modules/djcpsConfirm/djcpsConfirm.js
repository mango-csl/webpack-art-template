/**
 * 确认框confirm组件
 * layui-layer-confirm二次封装
 */
layui.define('layer', function (exports) {
    "use strict";
    var layer = layui.layer;
    // 定义组件
    var djcpsConfirm = {
        // 初始配置
        config: {
            //标题，也可以设置标题样式 ['文本', 'font-size:18px;']，传false则不显示标题栏
            title: '提示',
            //样式类名，会加载提示元素的最外层
            skin: 'cps-layer-confirm',
            //宽高，auto自适应，500px为宽度500高度仍自适应
            area: "auto",
            //坐标，auto垂直水平居中，100px为top坐标100水平仍居中，['100px', '50px']为top、left坐标
            //快捷设置，t顶部居中，r右边缘居中，b底部居中，l左边缘居中，lt左上角，lb左下角，rt右上角，rb右下角
            offset: 'auto',
            //图标，显示在文字之前
            icon: -1,
            //关闭按钮，样式1或2，0为无关闭按钮
            closeBtn: 0,
            //遮罩，确认框外区域#000背景透明度，0为不遮罩，[0.8, '#393D49']可自定义遮罩颜色
            shade: 0.3,
            //是否通过点击遮罩来关闭确认框
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
     * @param {*} yes 确定回调函数，携带两个参数，分别为当前层索引index、当前层DOM对象layero
     * @param {*} cancel 取消回调函数，携带两个参数，分别为当前层索引index、当前层DOM对象layero
     */
    var mainFn = function (content, options, yes, cancel) {
        var that = this;
        that.content = content === undefined ? '' : content;
        that.config = $.extend({}, djcpsConfirm.config, options);
        that.yes = typeof yes === 'function' ? yes : undefined;
        that.cancel = typeof cancel === 'function' ? cancel : undefined;
        that.loadHtml().then(function () {
            that.initConfirm();
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#confirmCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsConfirm/djcpsConfirm.html",
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
     * 初始化确认框功能
     */
    mainFn.prototype.initConfirm = function () {
        var that = this;
        layer.confirm(that.content, that.config, function (index, layero) {
            if (typeof that.yes === "function") {
                that.yes(index, layero);
            }
            layer.close(index);
        }, function(index, layero) {
            if (typeof that.cancel === "function") {
                that.cancel(index, layero);
            }
            layer.close(index);
        });
    };
    //组件入口
    djcpsConfirm.init = function (content, options, yes, cancel) {
        var inst = new mainFn(content, options, yes, cancel);
        return inst;
    };
    //输出组件
    exports('djcpsConfirm', djcpsConfirm);
});
