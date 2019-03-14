// tree树形菜单组件，layui-tree二次封装
layui.define('tree', function (exports) {
    'use strict';
    // 引用layui自带的树形菜单
    var tree = layui.tree;

    // 图标需要在tree.js改源码文件
    var icon = {
        // 箭头
        arrow: ['&#xe623;', '&#xe625;'],
        // 复选框
        checkbox: ['&#xe626;', '&#xe627;'],
        // 单选框
        radio: ['&#xe62b;', '&#xe62a;'],
        // 父节点
        branch: ['&#xe658;', '&#xe600;'],
        // 叶节点
        leaf: '&#xe621;'
    };

    // 定义组件
    var djcpsTree = {
        // 默认配置
        config: {
            // 指定元素的选择器，默认tree
            elem: $('#tree'),
            // 节点数据
            nodes: [],
            // 风格定义，默认为concise简洁风格
            skin: 'concise',
            // 点击节点的回调
            click: function (node) {
            },
            // 节点链接（可选），未设则不会跳转
            href: null,
            // 节点打开方式（即a的target值），必须href设定后才有效
            target: null,
        }
    };

    // 核心功能构造函数，options为配置参数
    var mainFn = function (options) {
        var that = this;
        // 合并默认配置，生成新的配置
        that.config = $.extend({}, djcpsTree.config, options);
        that.loadHtml().then(function () {
            that.initTree();
        });
    };
    // 加载模板文件
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#treeCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsTree/djcpsTree.html",
                async: false,
                success: function (result) {
                    $('body').append(result);
                    defer.resolve();
                }
            });
        }
        return defer.promise();
    };
    // 初始化树形菜单
    mainFn.prototype.initTree = function () {
        var that = this;
        tree(that.config);
    };
    // 组件入口
    djcpsTree.init = function (options) {
        return new mainFn(options);
    };
    // 输出组件
    exports('djcpsTree', djcpsTree);
});
