/**
 * 表单组件
 * layui-form二次封装
 */
layui.define(['form', 'laytpl', 'layer', 'djcpsDate', 'djcpsUpload'], function (exports) {
    "use strict";
    var layform = layui.form,
        laytpl = layui.laytpl,
        layer = layui.layer,
        djcpsDate = layui.djcpsDate,
        djcpsUpload = layui.djcpsUpload;
    var dateArr = [],
        uploadArr = [];
    var djcpsForm = {
        // 初始配置
        config: {
            //外部容器元素，传入jquery的dom对象
            container: $('#form'),
            //lay-filter过滤器
            layFilter: 'form',
            //lay-verType异常提示层模式，msg默认提示框，tips吸附层，alert对话框
            layVerType: 'msg',
            //是否为编辑状态，编辑状态下初始化时立即触发全局表单校验
            isEdit: false,
            //表单方框风格，默认不开启
            pane: false,
            //表单数据
            data: [{
                //元素的label标签内容
                label: '',
                //元素类型，password密码，text单行文本，select下拉框，checkbox复选框，radio单选框，textarea文本域，date日期控件，custom自定义html片段
                // 时间控件归入custom，并在业务页面创建后传入customHtml
                type: 'text',
                //元素的name值
                name: '',
                //元素的表单校验名和校验方法，自定义
                layVerify: {
                    name: '',
                    rules: function (value) { }
                },
                //表单元素的值，text、password、textarea
                value: '',
                //各组件的其他配置项（非通用配置）
                options: {
                    //是否禁用该组件，select、text、password、textarea、date
                    disabled: false,
                    //是否存在分组，select
                    hasGroup: false,
                    //是否允许搜索，select
                    laySearch: false,
                    //子项数据，select、radio、checkbox
                    data: [{
                        //子项显示值，select、radio、checkbox
                        title: '',
                        //子项value值，select、radio、checkbox
                        value: '',
                        //子项是否禁用，select、radio、checkbox
                        disabled: false,
                        //子项是否被选中，radio、checkbox、select
                        checked: false,
                        //checkbox风格，primary原始风格，switch开关风格，''为默认风格（文字+√）
                        laySkin: 'primary',
                        //自定义开关两种状态的文本，checkbox
                        layText: '开|关'
                    }],
                    //组件的placeholder，text、password、textarea、date
                    placeholder: '',
                    //是否开启自动填充，text、password
                    autocomplete: false,
                    //是否只读，text、password、textarea
                    readonly: false,
                },
                //自定义html片段，custom
                customHtml: ''
            }]
        }
    };
    /**
     * 核心功能构造函数
     * @param {*} options 配置项
     */
    var mainFn = function (options) {
        var that = this;
        that.config = $.extend({}, djcpsForm.config, options);
        that.loadHtml().then(function () {
            return that.renderHtml();
        }).then(function () {
            that.initForm();
            that.rules = {};
            var initValue = {};
            for (var i = 0; i < that.config.data.length; i++) {
                var data = that.config.data[i];
                //存在自定义校验规则的，初始化自定义校验规则
                if (data.layVerify && data.layVerify.rules) {
                    that.rules[data.layVerify.name] = data.layVerify.rules;
                }
                //text、password、textarea存在value初始值的，渲染初始值
                if (data.value) {
                    initValue[data.name] = data.value;
                }
                //对日期时间控件、文件上传控件另外处理
                if (data.type === 'date') {
                    var options = (function (dateData) {
                        var newOptions = $.extend({}, dateData.options, {
                            container: $('.' + dateData.name + ' .layui-input-block'),
                            //重写done事件，加入表单校验监听机制
                            done: function (value, date, endDate) {
                                that.singleValidate($('.' + dateData.name + ' .layui-input-block').find('input'));
                                if (typeof dateData.options.done === 'function') {
                                    dateData.options.done(value, date, endDate);
                                }
                            }
                        });
                        return newOptions;
                    })(data);
                    dateArr[data.name] = djcpsDate.init(options);
                    $('.' + data.name + ' .layui-input-block').find('input').attr({
                        name: data.name,
                        'lay-verify': data.layVerify.name
                    });
                } else if (data.type === 'upload') {
                    var options = (function (uploadData) {
                        var newOptions = $.extend({}, uploadData.options, {
                            //重写choose和before事件，多传入实例参数，方便在业务层调用实例方法
                            choose: function (obj) {
                                if (typeof uploadData.options.choose === 'function') {
                                    uploadData.options.choose(obj, uploadArr[uploadData.name]);
                                }
                            },
                            before: function (obj) {
                                if (typeof uploadData.options.before === 'function') {
                                    uploadData.options.before(obj, uploadArr[uploadData.name]);
                                }
                            }
                        });
                        return newOptions;
                    })(data);
                    uploadArr[data.name] = djcpsUpload.init(options);
                    $('.' + data.name + ' .layui-input-block').find('.uploadContent').attr({
                        name: data.name,
                        'lay-verify': data.layVerify.name
                    });
                }
            }
            //全局设置异常提示模式，包括自定义模块
            that.config.container.find('input,textarea,select').attr('lay-verType', that.config.layVerType);
            that.verifyRules();
            that.setValue(initValue);
            that.autoValidate();
            //编辑状态下初始化即触发全局校验
            if (that.config.isEdit) {
                that.fullValidate();
            }
        });
    };
    /**
     * 加载模板文件
     */
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#formCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsForm/djcpsForm.html",
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
        that.arrangeData();
        var data = {
            layFilter: that.config.layFilter,
            layVerType: that.config.layVerType,
            pane: that.config.pane,
            data: that.config.data
        };
        var tpl = $('#formTpl').html();
        laytpl(tpl).render(data, function (html) {
            that.config.container.html(html);
            defer.resolve();
        });
        return defer.promise();
    };
    /**
     * 处理select数据，返回一个处理后的新数据
     */
    mainFn.prototype.arrangeData = function () {
        var that = this;
        var arrangedData = that.config.data;
        //整理后的select数据
        var selectOptionData = {};
        for (var i = 0; i < arrangedData.length; i++) {
            //筛选出select数据
            if (arrangedData[i].type === 'select' && arrangedData[i].options.hasGroup) {
                for (var j = 0; j < arrangedData[i].options.data.length; j++) {
                    var optionData = arrangedData[i].options.data[j];
                    //如果带groupLabel属性，则存在select分组，并对相同的groupLabel值进行分组
                    //分组数据归为对象下的一个数组，不分组数据归为一个对象
                    if (optionData.groupLabel) {
                        if (selectOptionData[optionData.groupLabel]) {
                            selectOptionData[optionData.groupLabel].push(optionData);
                        } else {
                            selectOptionData[optionData.groupLabel] = [].concat([optionData]);
                        }
                    } else {
                        selectOptionData[j] = optionData;
                    }
                }
                //将老数据替换成新数据
                arrangedData[i].options.data = selectOptionData;
            }
        }
    };
    /**
     * 初始化表单
     * @param {*} type 更新元素类型，select下拉框，checkbox复选框，radio单选框，null全部元素
     */
    mainFn.prototype.initForm = function (type) {
        var that = this;
        layform.render(type, that.config.layFilter);
    };
    /**
     * 验证规则设定
     */
    mainFn.prototype.verifyRules = function () {
        var that = this;
        layform.verify(that.rules);
    };
    /**
     * 表单事件监听
     * @param {*} event 监听的事件名
     * @param {*} callback 监听的回调事件
     */
    mainFn.prototype.on = function (events, callback) {
        layform.on(events, function (obj) {
            if (typeof callback === 'function') {
                callback(obj);
            }
            return false;
        });
    };
    /**
     * 初始赋值
     * @param {*} object 初始值对象，传入{元素name: 元素value}的形式
     */
    mainFn.prototype.setValue = function (object) {
        var that = this;
        layform.val(that.config.layFilter, object);
    };
    /**
     * 初始化表单后开启自动校验
     */
    mainFn.prototype.autoValidate = function () {
        var that = this;
        that.config.container.find('*[lay-verify]').each(function (index, item) {
            if (!$(item).hasClass('layui-input-date')) {
                $(item).unbind().bind('blur', function () {
                    that.singleValidate($(this));
                });
            }
        });
    };
    /**
     * 单个表单项校验，校验逻辑与layui.form源码基本一致
     * @param {*} $dom 表单项元素
     */
    mainFn.prototype.singleValidate = function ($dom) {
        var that = this;
        var rule = that.rules[$dom.attr('lay-verify')];
        var value = $dom.val();
        //注：异步请求需要设置async:false后return结果
        var invalidMsg = rule(value);
        if (invalidMsg) {
            $dom.addClass('layui-form-danger');
            if (that.config.layVerType === 'tips') {
                layer.tips(invalidMsg, function () {
                    if (typeof $dom.attr('lay-ignore') !== 'string') {
                        if ($dom[0].tagName.toLowerCase() === 'select' || /^checkbox|radio$/.test($dom[0].type)) {
                            return $dom.next();
                        }
                    }
                    return $dom;
                }(), { tips: 1, tipsMore: true });
            } else if (that.config.layVerType === 'alert') {
                layer.alert(invalidMsg, { title: '提示', shadeClose: true });
            } else {
                layer.msg(invalidMsg, { icon: 5, shift: 6 });
            }
        } else {
            $dom.removeClass('layui-form-danger');
        }
    };
    /**
     * 全局校验表单
     */
    mainFn.prototype.fullValidate = function () {
        var that = this;
        that.config.container.find('*[lay-verify]').each(function (index, item) {
            that.singleValidate($(item));
        });
    };
    // 组件入口
    djcpsForm.init = function (options) {
        var inst = new mainFn(options);
        return inst;
    };
    // 输出组件
    exports('djcpsForm', djcpsForm);
});
