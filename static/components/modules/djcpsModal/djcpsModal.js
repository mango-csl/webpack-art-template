/**
 * 模态框（弹窗）组件
 * layui-layer-open二次封装
 */
layui.define('layer', function (exports) {
    "use strict";
    var layer = layui.layer;
    // 定义组件
    var djcpsModal = {
        // 初始配置
        config: {
            //内容层类型: 1页面层，2iframe层
            type: 1,
            //标题，也可以设置标题样式 ['文本', 'font-size:18px;']，传false则不显示标题栏
            title: '提示',
            //内容，页面层为文本或jquery的dom元素，iframe层则为url
            content: '',
            //样式类名，会加载模态框元素的最外层
            skin: 'cps-layer-modal',
            //宽高，auto自适应，500px为宽度500高度仍自适应
            area: ['500px', '300px'],
            //坐标，auto垂直水平居中，100px为top坐标100水平仍居中，['100px', '50px']为top、left坐标
            //快捷设置，t顶部居中，r右边缘居中，b底部居中，l左边缘居中，lt左上角，lb左下角，rt右上角，rb右下角
            offset: 'auto',
            //关闭按钮，样式1或2，0为无关闭按钮
            closeBtn: 1,
            //遮罩，模态框外区域#000背景透明度，0为不遮罩，[0.8, '#393D49']可自定义遮罩颜色
            shade: 0.3,
            //是否通过点击遮罩来关闭模态框
            shadeClose: false,
            //是否显示最大最小化按钮
            maxmin: false,
            //是否固定在可视区域（鼠标滚动时）
            fixed: true,
            //是否允许拉伸
            resize: false,
            //是否允许浏览器出现滚动条
            scrollbar: true,
            //最大宽度，只有在area宽度自适应时才有效
            maxWidth: 500,
            //最大高度，只有在area高度自适应时才有效
            maxHeight: 300,
            //层叠顺序，一般用于解决和其他组件的层叠冲突
            zIndex: 19891014,
            //触发拖拽的元素，传元素选择器'.layui-layer-title'，传false禁止拖拽
            move: false,
            //是否允许拖拽到窗口外
            moveOut: false
            //模态框弹出后的回调，带layero参数为当前层的dom对象，index参数为当前层的索引
            // success: function (layero, index) { },
            //点击右上角关闭按钮时的回调，默认自动触发关闭，return false可阻止关闭带layero参数为当前层的dom对象，index参数为当前层的索引
            // cancel: function (index, layero) { },
            //模态框销毁后的回调，不管确认还是取消都会触发，不带任何参数
            // end: function () { }
        }
    };
    /**
     * 核心功能构造函数
     * @param {*} options 配置项
     */
    var mainFn = function (options) {
        var that = this;
        that.config = $.extend({}, djcpsModal.config, options);
        that.loadHtml().then(function () {
            that.initModal();
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#modalCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsModal/djcpsModal.html",
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
     * 初始化模态框功能
     */
    mainFn.prototype.initModal = function () {
        var that = this;
        setTimeout(function () {
            that.modal = layer.open(that.config);
        });
    };
    /**
     * 模态框弹出后的回调
     * 带layero参数为当前层的dom对象，index参数为当前层的索引
     */
    mainFn.prototype.success = function (fn) {
        var that = this;
        if (typeof fn === 'function') {
            that.config = $.extend({}, that.config, { success: fn });
        }
    };
    /**
     * 点击右上角关闭按钮时的回调，默认自动触发关闭，return false可阻止关闭
     * 带layero参数为当前层的dom对象，index参数为当前层的索引
     */
    mainFn.prototype.cancel = function (fn) {
        var that = this;
        if (typeof fn === 'function') {
            that.config = $.extend({}, that.config, { cancel: fn });
        }
    };
    /**
     * 模态框销毁后的回调，不管确认还是取消都会触发，不带任何参数
     */
    mainFn.prototype.end = function (fn) {
        var that = this;
        if (typeof fn === 'function') {
            that.config = $.extend({}, that.config, { end: fn });
        }
    };
    /**
     * 模态框拉伸后的回调，带layero参数为当前层的dom对象
     */
    mainFn.prototype.resizing = function (fn) {
        var that = this;
        if (typeof fn === 'function') {
            that.config = $.extend({}, that.config, { end: fn });
        }
    };
    /**
     * 拖拽完毕后的回调，带layero参数为当前层的dom对象
     */
    mainFn.prototype.moveEnd = function (fn) {
        var that = this;
        if (typeof fn === 'function') {
            that.config = $.extend({}, that.config, { end: fn });
        }
    };
    /**
     * 模态框最大化后的回调
     * 带layero参数为当前层的dom对象
     */
    mainFn.prototype.full = function (fn) {
        var that = this;
        if (typeof fn === 'function') {
            that.config = $.extend({}, that.config, { full: fn });
        }
    };
    /**
     * 模态框最小化后的回调
     * 带layero参数为当前层的dom对象
     */
    mainFn.prototype.min = function (fn) {
        var that = this;
        if (typeof fn === 'function') {
            that.config = $.extend({}, that.config, { min: fn });
        }
    };
    /**
     * 模态框恢复原窗口后的回调
     * 带layero参数为当前层的dom对象
     */
    mainFn.prototype.restore = function (fn) {
        var that = this;
        if (typeof fn === 'function') {
            that.config = $.extend({}, that.config, { restore: fn });
        }
    };
    /**
     * 关闭模态框
     * @param index 当前模态框的index
     */
    mainFn.prototype.close = function (index) {
        var that = this;
        var modalIndex = index || that.modal;
        if (modalIndex) {
            layer.close(modalIndex);
        }
    };
    /**
     * 批量关闭模态框
     * @param type 模态框类型，不传关闭所有模态框
     */
    mainFn.prototype.closeAll = function (type) {
        layer.closeAll(type);
    };
    /**
     * 改变模态框最外层的样式
     * @param cssObj css对象，以{'font-size': '18px'}为例
     * @param index 当前模态框的index
     */
    mainFn.prototype.changeStyle = function (cssObj, index) {
        var that = this;
        var modalIndex = index || that.modal;
        if (modalIndex) {
            layer.style(modalIndex, cssObj);
        }
    };
    /**
     * 改变模态框的标题
     * @param newTitle 新的标题
     * @param index 当前模态框的index
     */
    mainFn.prototype.changeTitle = function (newTitle, index) {
        var that = this;
        var modalIndex = index || that.modal;
        if (modalIndex) {
            layer.title(newTitle, modalIndex);
        }
    };
    /**
     * 获取iframe页的dom元素，返回一个jquery的dom元素
     * @param dom 要获取的dom元素
     * @param index 当前模态框的index
     */
    mainFn.prototype.getChildFrame = function (dom, index) {
        var that = this;
        var modalIndex = index || that.modal;
        if (modalIndex) {
            return layer.getChildFrame(dom, modalIndex);
        }
    };
    /**
     * 指定iframe层自适应
     * @param index 当前模态框的index
     */
    mainFn.prototype.iframeAuto = function (index) {
        var that = this;
        var modalIndex = index || that.modal;
        if (modalIndex) {
            layer.iframeAuto(modalIndex);
        }
    };
    /**
     * 重置iframe层的url
     * @param url 新的iframe地址
     * @param index 当前模态框的index
     */
    mainFn.prototype.iframeSrc = function (url, index) {
        var that = this;
        var modalIndex = index || that.modal;
        if (modalIndex) {
            layer.iframeSrc(modalIndex, url);
        }
    };
    /**
     * 置顶当前模态框窗口
     * @param layero 当前模态框的dom元素对象layero
     */
    mainFn.prototype.setTop = function (layero) {
        layer.iframeSrc(layero);
    };
    /**
     * 对模态框进行最大化、最小化、恢复原窗口
     * @param type 操作类型，1最大化，2最小化，3恢复原窗口
     * @param index 当前模态框的index
     */
    mainFn.prototype.setMaxMin = function (type, index) {
        var that = this;
        var modalIndex = index || that.modal;
        if (modalIndex) {
            if (type === 1) {
                layer.full(modalIndex);
            } else if (type === 2) {
                layer.min(modalIndex);
            } else if (type === 3) {
                try {
                    layer.restore(modalIndex);
                } catch (e) {
                    console.log('未进行过最大、最小化，因此无法执行恢复原窗口操作！')
                }
            }
        }
    };
    //组件入口
    djcpsModal.init = function (options) {
        var inst = new mainFn(options);
        return inst;
    };
    //输出组件
    exports('djcpsModal', djcpsModal);
});
