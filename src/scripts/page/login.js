// 引入css
require('../../styles/base/index.less');
require('../../styles/page/login.less');
// require('../../styles/lib/layui/css/layui.css');
// layui.extend({
//     djcpsAlert: 'static/lib/components/modules/djcpsAlert/djcpsAlert'
// });
/* eslint-disable no-undef */
$(function () {
    // (function (layui) {
    require('../../utils/layui_extend');
    // var $ = layui.jquery;
    // layui.extend({
    //     djcpsAlert: 'static/lib/components/modules/djcpsAlert/djcpsAlert'
    // });
    layui.use('djcpsAlert', function () {
        var djcpsAlert = layui.djcpsAlert;
        $('.alert').click(function () {
            djcpsAlert.init('当前信息已过期，请重新登录', undefined, function (index, layero) {
                console.log(index, layero);
            });
        });
    });
    layui.use(['djcpsDate'], function () {
        var djcpsDate = layui.djcpsDate;
        djcpsDate.init({
            container: $('#date'),
            id: 'date1',
            type: 'date',
            placeholder: '请选择日期'
        });
        djcpsDate.init({
            container: $('#year'),
            id: 'year1',
            type: 'year',
            placeholder: '请选择年份'
        });
        djcpsDate.init({
            container: $('#month'),
            id: 'month1',
            type: 'month',
            placeholder: '请选择年月'
        });
        djcpsDate.init({
            container: $('#time'),
            id: 'time1',
            type: 'time',
            placeholder: '请选择时间'
        });
        djcpsDate.init({
            container: $('#datetime'),
            id: 'datetime1',
            type: 'datetime',
            placeholder: '请选择日期时间'
        });
        djcpsDate.init({
            container: $('#dateRange'),
            id: 'dateRange1',
            type: 'date',
            range: true,
            placeholder: '请选择日期区间'
        });
        djcpsDate.init({
            container: $('#yearRange'),
            id: 'yearRange1',
            type: 'year',
            range: true,
            placeholder: '请选择年份区间'
        });
        djcpsDate.init({
            container: $('#monthRange'),
            id: 'monthRange1',
            type: 'month',
            range: true,
            placeholder: '请选择年月区间'
        });
        djcpsDate.init({
            container: $('#timeRange'),
            id: 'timeRange1',
            type: 'time',
            range: true,
            placeholder: '请选择时间区间'
        });
        djcpsDate.init({
            container: $('#datetimeRange'),
            id: 'datetimeRange1',
            type: 'datetime',
            range: true,
            placeholder: '请选择日期时间区间',
            theme: 'default'
        });
        djcpsDate.init({
            container: $('#datetimeRangeMolv'),
            id: 'datetimeRangeMolv1',
            type: 'datetime',
            range: true,
            placeholder: '请选择日期时间区间',
            theme: 'molv'
        });
        djcpsDate.init({
            container: $('#datetimeRangeCustom'),
            id: 'datetimeRangeCustom1',
            type: 'datetime',
            range: true,
            placeholder: '请选择日期时间区间',
            theme: '#393D49'
        });
        djcpsDate.init({
            container: $('#datetimeRangeGrid'),
            id: 'datetimeRangeGrid1',
            type: 'datetime',
            range: true,
            placeholder: '请选择日期时间区间',
            theme: 'grid'
        });
        djcpsDate.init({
            container: $('#datetimeRangeConcise'),
            id: 'datetimeRangeConcise1',
            type: 'datetime',
            range: true,
            placeholder: '请选择日期时间区间',
            theme: 'concise'
        });
    });
    layui.use('djcpsConfirm', function () {
        var djcpsConfirm = layui.djcpsConfirm;
        $('.confirm').click(function () {
            djcpsConfirm.init('是否删除此项数据?', undefined, function (index, layero) {
                console.log('success', layero);
            }, function (index, layero) {
                console.log('cancel', layero);
            });
        });
    });
    layui.use('djcpsMsg', function () {
        var djcpsMsg = layui.djcpsMsg;
        $('.msg').click(function () {
            djcpsMsg.init('当前信息已过期，请重新登录', undefined, function () {
                console.log('end');
            });
        });
    });
    layui.use(['djcpsUpload', 'laytpl', 'layer'], function () {
        var djcpsUpload = layui.djcpsUpload;
        var laytpl = layui.laytpl;
        var layer = layui.layer;
        var uploadListTpl = '{{# layui.each(d,function(index, item) { }} ' +
            '<tr data-index={{item.index}}> ' +
            '<td class="name">{{item.file.name}}</td> ' +
            '<td><img src="{{item.url}}"></td> ' +
            '<td>{{(item.file.size/1024).toFixed(1)}}kb</td> ' +
            '<td class="aaa">等待上传</td> ' +
            '<td> ' +
            '<!-- <button class="layui-btn rename">重命名</button> --> ' +
            '<button class="layui-btn reupload">重传</button> ' +
            '<button class="layui-btn delete">删除</button> ' +
            '</td> ' +
            '</tr>' +
            '{{# }); }}';
        var loading;
        var fileArr = [];
        var upload1 = djcpsUpload.init({
            elem: '#upload1',
            url: '/api/upload',
            data: {id: 111111, name: 'hahaha'},
            accept: 'images',
            acceptMime: 'image/jpg, image/png, image/jpeg',
            exts: 'jpg|png|jpeg',
            auto: false,
            bindAction: $('#uploadBtn'),
            field: 'file',
            size: 100,
            multiple: true,
            number: 0,
            drag: false,
            choose: function (obj) {
                upload1.filePreview(obj).then(function (fileArr) {
                    laytpl(uploadListTpl).render(fileArr, function (html) {
                        $('#uploadBody').html(html);
                        $('.delete').unbind().bind('click', function () {
                            var index = $(this).parents('tr').data('index');
                            var itemIndex = (function () {
                                for (var i = 0; i < fileArr.length; i++) {
                                    if (fileArr[i].index === index) {
                                        return i;
                                    }
                                }
                            })();
                            upload1.deleteFile(fileArr[itemIndex].index, $(this).parents('tr'));
                            fileArr.splice(itemIndex, 1);
                        });
                        $('.reupload').unbind().bind('click', function () {
                            var index = $(this).parents('tr').data('index');
                            var itemIndex = (function () {
                                for (var i = 0; i < fileArr.length; i++) {
                                    if (fileArr[i].index === index) {
                                        return i;
                                    }
                                }
                            })();
                            upload1.reupload(obj, fileArr[itemIndex].file, fileArr[itemIndex].index);
                        });
                    });
                });
            },
            before: function (obj) {
                var fileArr = upload1.filePreview(obj);
                console.log(fileArr);
                loading = layer.load();
            },
            done: function (res, index, upload) {
                console.log(res, index, upload);
            },
            error: function (index, upload) {
                console.log(index, upload);
            },
            allDone: function (obj) {
                console.log(obj);
                layer.close(loading);
            }
        });
        $('#reupload').click(function () {
            upload1.reupload();
        });
    });
    layui.use('djcpsTips', function () {
        var djcpsTips = layui.djcpsTips;
        $('.tips').click(function () {
            djcpsTips.init('这是一段文字', $('.tips'), {});
        });
    });
    layui.use('djcpsProgress', function () {
        var djcpsProgress = layui.djcpsProgress;
        var progress = djcpsProgress.init({
            filter: 'progress',
            bigProgress: true,
            showPercent: true,
            percent: '20%'
        });
        setTimeout(function () {
            progress.setProgress('progress', '50%');
        }, 3000);
    });
    layui.use(['djcpsPanel'], function () {
        var djcpsPanel = layui.djcpsPanel;
        djcpsPanel.init({
            data: [
                {
                    'title': '为什么JS社区大量采用未发布或者未广泛支持的语言特性？',
                    'content': '<p>有不少其他答案说是因为JS太差。我下面的答案已经说了，这不是根本性的原因。但除此之外，我还要纠正一些对JS具体问题的误解。JS当初是被作为脚本语言设计的，所以某些问题并不是JS设计得差或者是JS设计者的失误。比如var的作用域问题，并不是“错误”，而是当时绝大部分脚本语言都是这样的，如perl/php/sh等。模块的问题也是，脚本语言几乎都没有模块/命名空间功能。弱类型、for-in之类的问题也是，只不过现在用那些老的脚本语言的人比较少，所以很多人都误以为是JS才有的坑。另外有人说JS是半残语言，满足不了开发需求，1999年就该死。半残这个嘛，就夸张了。JS虽然有很多问题，但是设计总体还是优秀的。——来自知乎@贺师俊</p>'
                },
                {
                    'title': '为什么JS社区大量采用未发布或者未广泛支持的语言特性1？',
                    'content': '<p>有不少其他答案说是因为JS太差。我下面的答案已经说了，这不是根本性的原因。但除此之外，我还要纠正一些对JS具体问题的误解。JS当初是被作为脚本语言设计的，所以某些问题并不是JS设计得差或者是JS设计者的失误。比如var的作用域问题，并不是“错误”，而是当时绝大部分脚本语言都是这样的，如perl/php/sh等。模块的问题也是，脚本语言几乎都没有模块/命名空间功能。弱类型、for-in之类的问题也是，只不过现在用那些老的脚本语言的人比较少，所以很多人都误以为是JS才有的坑。另外有人说JS是半残语言，满足不了开发需求，1999年就该死。半残这个嘛，就夸张了。JS虽然有很多问题，但是设计总体还是优秀的。——来自知乎@贺师俊</p>'
                }
            ]
        });
    });
    layui.use('djcpsPage', function () {
        var djcpsPage = layui.djcpsPage;
        getList(1, 10);

        /**
         * 获取列表数据
         * @param {*} currpage 当前页码
         * @param {*} pagesize 每页显示数据数
         */
        function getList(currpage, pagesize) {
            $.get('./static/data.json', function (res) {
                var data = res.data.slice((currpage - 1) * pagesize, currpage * pagesize);
                var html = data.map(function (item) {
                    return '<li>' + item.text + '</li>';
                });
                $('.list').html(html);
                djcpsPage.init({
                    elem: $('#page'),
                    count: res.count, //数据总数
                    curr: currpage,
                    limit: pagesize,
                    theme: 'cps',
                    layout: ['count', 'prev', 'page', 'next', 'skip'],
                    jump: function (obj, first) {
                        if (!first) {
                            getList(obj.curr, obj.limit);
                        }
                    }
                });
                djcpsPage.init({
                    elem: $('#pageDefault'),
                    count: res.count, //数据总数
                    curr: currpage,
                    limit: pagesize,
                    theme: 'default',
                    prev: 'prev',
                    next: 'next',
                    first: '1',
                    last: Math.ceil(res.count / pagesize),
                    layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
                    jump: function (obj, first) {
                        if (!first) {
                            getList(obj.curr, obj.limit);
                        }
                    }
                });
                // laytpl(getTpl).render(data, function (html) {
                //
                // });
            });
        }
    });
    layui.use(['djcpsCarousel', 'laytpl'], function () {
        var djcpsCarousel = layui.djcpsCarousel;
        var laytpl = layui.laytpl;
        // todo `` 是es6中的语法，当前采用的是es2015-loose暂不支持，目前考虑打包后文件大小暂不引入es6语法
        var tpl = '{{# layui.each(d, function(index, item) { }} <div> <div class="first">{{item.firstTxt}}</div> <div class="second">{{item.secondTxt}}</div> <img src="{{item.img}}"></div>{{# }) }}';
        var data = [
            {
                firstTxt: '01',
                secondTxt: '11',
                img: 'static/images/1.jpg'
            }, {
                firstTxt: '02',
                secondTxt: '12',
                img: 'static/images/2.jpg'
            }, {
                firstTxt: '03',
                secondTxt: '13',
                img: 'static/images/3.jpg'
            }, {
                firstTxt: '04',
                secondTxt: '14',
                img: 'static/images/4.jpg'
            }, {
                firstTxt: '05',
                secondTxt: '15',
                img: 'static/images/5.jpg'
            }, {
                firstTxt: '06',
                secondTxt: '16',
                img: 'static/images/6.jpg'
            }];
        laytpl(tpl).render(data, function (html) {
            djcpsCarousel.init({
                container: $('#carouselInner'),
                interval: 5000,
                options: {
                    type: 'custom',
                    prop: '',
                    customHtml: html,
                    errorSrc: 'static/images/error.png'
                },
                filter: 'test',
                change: function (obj) {
                    // console.log('test', obj);
                }
            });
        });
        var carousel = djcpsCarousel.init({
            interval: 5000,
            speed: 0.3,
            options: {
                type: 'img',
                prop: 'img',
                errorSrc: 'static/images/error.png'
            },
            data: [{
                img: 'static/images/1.jpg',
                alt: '111',
                text: '111'
            }, {
                img: 'static/images/2.jpg',
                alt: '222',
                text: '222'
            }, {
                img: 'static/images/3.jpg',
                alt: '333',
                text: '333'
            }, {
                img: 'static/images/4.jpg',
                alt: '444',
                text: '444'
            }, {
                img: 'static/images/5.jpg',
                alt: '555',
                text: '555'
            }, {
                img: 'static/images/6.jpg',
                alt: '666',
                text: '666'
            }],
            change: function (obj) {
                // console.log('default', obj);
            }
        });
    });
    layui.use('djcpsModal', function () {
        var djcpsModal = layui.djcpsModal;
        $('.dom').click(function () {
            var modal = djcpsModal.init({
                content: $('#modal'),
                maxmin: true
            });
            modal.success(function (layero, index) {
                modal.changeTitle('标题改了', index);
                var body = modal.getChildFrame('body');
                console.log(body);
                // modal.setMaxMin(1, index);
                setTimeout(function () {
                    console.log('success');
                    console.log(layero);
                    console.log(index);
                    // modal.closeAll('dialog');
                    modal.changeStyle({'font-size': '30px', 'color': 'red'}, index);
                    modal.changeTitle('标题又改了', index);
                    modal.setMaxMin(3, index);
                }, 2000);
            });
            modal.cancel(function (index, layero) {
                setTimeout(function () {
                    console.log('cancel');
                    console.log(layero);
                    console.log(index);
                    modal.close(index);
                }, 2000);
                return false;
            });
            modal.end(function () {
                setTimeout(function () {
                    console.log('end');
                }, 2000);
            });
            modal.full(function (layero) {
                console.log(layero);
            });
            modal.min(function (layero) {
                console.log(layero);
            });
            modal.restore(function (layero) {
                console.log(layero);
            });
        });
        $('.iframe').click(function () {
            var iframeModal = djcpsModal.init({
                type: 2,
                content: '/about'
            });
            iframeModal.success(function (layero, index) {
                var body = iframeModal.getChildFrame('body', index);
                console.log(body);
            });
        });
    });
    layui.use('djcpsLoad', function () {
        var djcpsLoad = layui.djcpsLoad;
        $('.load1').click(function () {
            var load = djcpsLoad.init(1);
            setTimeout(function () {
                load.close();
            }, 3000);
        });
        $('.load2').click(function () {
            var load = djcpsLoad.init(2);
            setTimeout(function () {
                load.close();
            }, 3000);
        });
        $('.load3').click(function () {
            var load = djcpsLoad.init(0);
            setTimeout(function () {
                load.close();
            }, 3000);
        });
    });
    layui.use(['djcpsFlow'], function () {
        var djcpsFlow = layui.djcpsFlow;
        var flow = djcpsFlow.init({
            scrollElem: '#layflow',
            end: '没有了~~',
            done: function (page, next) {
                setTimeout(function () {
                    var lis = [];
                    for (var i = 0; i < 10; i++) {
                        lis.push('<li>' + ((page - 1) * 10 + i + 1) + '</li>');
                    }
                    next(lis.join(''), page < 10); //假设总页数为 10
                }, 500);
            }
        });
        var flows = djcpsFlow.init({
            elem: '#layflowlazy',
            scrollElem: '#layflowlazy',
            isLazyimg: true,
            isAuto: false,
            mb: '300',
            done: function (page, next) {
                setTimeout(function () {
                    var lis = [];
                    for (var i = 0; i < 51; i++) {
                        lis.push('<li style="float: left;padding: 0 11px 0 11px;width: 155px;height: 170px;overflow: hidden;position: relative;"><div style="width: 140px;height: 140px;overflow: hidden;background: #f4f4f4;"><img lay-src="static/images/bee.png?v=' + ((page - 1) * 51 + i + 1) + '" style="display: block;width: 101%; height: 100%; "></div><h4 style="margin-top: 7px;line-height: 22px;font-size: 14px;color: #666;font-weight: normal;overflow: hidden;">略略略</h4></li>');
                    }
                    next(lis.join(''), page < 1);
                }, 500);
            }
        });
    });
    layui.use(['layer', 'djcpsTree'], function () {
        var layer = layui.layer,
            djcpsTree = layui.djcpsTree;

        var data = [
            {
                // 节点名称
                name: '研发中心',
                // 是否展开状态（默认false）
                spread: true,
                // 节点链接（可选），未设则不会跳转
                href: null,
                // 可以自定义参数
                id: null,
                children: [
                    {
                        name: '温州部'
                    },
                    {
                        name: '杭州部'
                    }
                ]
            },
            {
                name: '人资中心',
                spread: true,
                children: [
                    {
                        name: '招聘组',
                        spread: true,
                        children: [
                            {
                                name: '小组'
                            }
                        ]
                    }
                ]
            }
        ];

        // 简洁风格
        var tree = djcpsTree.init({
            nodes: data,
            click: function (node) {
                layer.msg(node['name']);
            }
        });
        // 默认风格
        djcpsTree.init({
            // 绑定元素
            elem: '#defaultTree',
            // 默认风格
            skin: '',
            nodes: data,
            click: function (node) {
                layer.msg(node['name']);
            }
        });
    });
    layui.use(['djcpsForm'], function () {
        var djcpsForm = layui.djcpsForm;
        var forms = djcpsForm.init({
            layFilter: 'example', // form lay-filter命名
            layVerType: 'tips',
            isEdit: false,
            pane: false,
            data: [
                {
                    type: 'upload',
                    'label': '文件上传', //表单描述
                    'name': 'upload',
                    'layVerify': {
                        name: 'ccc',
                        rules: function (value) {
                            if (!value) {
                                return "文件未上传";
                            }
                        }
                    },
                    customHtml: $('#uploadPic').html(),
                    options: {
                        elem: '#test1',
                        url: '/upload/',
                        auto: false,
                        choose: function (obj, modal) {
                            console.log(obj);
                            modal.filePreview().then(function (fileArr) {
                                // modal.deleteAllFile();
                                $('#demo1').attr('src', fileArr[fileArr.length - 1].url);
                                $('.upload .layui-input-block').find('.uploadContent').val(fileArr[fileArr.length - 1].url);
                            });
                        }
                    }
                },
                {
                    'type': 'select', // 表单类型 password (密码) text（单行文本）select（选择框）checkbox（复选框）radio（单选框）textarea（文本域）
                    'label': '下拉选择框', // 表单描述
                    'name': 'select', // 规定 input 元素的名称
                    'layVerify': {
                        name: 'select',
                        rules: function (value) {
                            if (value === '-1') {
                                return "必填项";
                            }
                        }
                    },
                    'options': {
                        'disabled': false, // 是否禁用
                        laySearch: true, // 是否允许搜索
                        data: [{
                            'title': '请选择', // 自定义文本
                            'value': '-1', // 规定 input 元素的值
                            'disabled': false // 是否禁用
                        },
                            {
                                'title': '111', //自定义文本
                                'value': '0',
                                'disabled': true//是否禁用
                            },
                            {
                                'title': '222', //自定义文本
                                'value': '1',
                                'disabled': false, //是否禁用
                                'checked': true
                            }]
                    }
                },
                {
                    'type': 'select', // 表单类型 password (密码) text（单行文本）select（选择框）checkbox（复选框）radio（单选框）textarea（文本域）
                    'label': '分组下拉框', // 表单描述
                    'name': 'groupSelect', // 规定 input 元素的名称
                    'layVerify': {
                        name: 'groupSelect',
                        rules: function (value) {
                            if (value === '-1') {
                                return "必填项";
                            }
                        }
                    },
                    'options': {
                        'disabled': false, // 是否禁用
                        laySearch: true, // 是否允许搜索
                        hasGroup: true,
                        data: [{
                            'title': '请选择', // 自定义文本
                            'value': '-1', // 规定 input 元素的值
                            'disabled': false // 是否禁用
                        },
                            {
                                'groupLabel': '数字',
                                'title': '111', //自定义文本
                                'value': '0',
                                'disabled': true//是否禁用
                            },
                            {
                                'groupLabel': '数字',
                                'title': '222', //自定义文本
                                'value': '1',
                                'disabled': false, //是否禁用
                                'checked': true
                            },
                            {
                                'groupLabel': '数字',
                                'title': '333', //自定义文本
                                'value': '3',
                                'disabled': false, //是否禁用
                                'checked': false
                            },
                            {
                                'groupLabel': '字母',
                                'title': 'aaa', //自定义文本
                                'value': 'a',
                                'disabled': false//是否禁用
                            },
                            {
                                'groupLabel': '字母',
                                'title': 'bbb', //自定义文本
                                'value': 'b',
                                'disabled': false//是否禁用
                            },
                            {
                                'groupLabel': '字母',
                                'title': 'ccc', //自定义文本
                                'value': 'c',
                                'disabled': false//是否禁用
                            }]
                    }
                },
                {
                    'type': 'text', //表单类型
                    'label': '单行文本框', //表单描述
                    'name': 'text',
                    'layVerify': {
                        name: 'text',
                        rules: function (value) {
                            if (!value) {
                                return "必填项";
                            }
                        }
                    }, //表单验证
                    options: {
                        'placeholder': '请输入文字', //表单描述
                        'autocomplete': false, //规定输入字段是否应该启用自动完成功能
                        'disabled': false, //是否禁用
                        'readonly': false //是否只读
                    }
                },
                {
                    'type': 'radio', //表单类型
                    'label': '单选框', //表单描述
                    'name': 'radio',
                    'options': {
                        data: [ //单选框，复选框，选择框需要的参数
                            {
                                'title': '男', //自定义文本
                                'value': 'a',
                                'disabled': false, //是否禁用
                                'checked': false //是否选中
                            },
                            {
                                'title': '女', //自定义文本
                                'value': 'b', //规定 input 元素的值
                                'disabled': true, //是否禁用
                                'checked': false //是否选中
                            },
                            {
                                'title': '不明', //自定义文本
                                'value': 'c', //规定 input 元素的值
                                'disabled': true, //是否禁用
                                'checked': true //是否选中
                            },
                            {
                                'title': '秀吉', //自定义文本
                                'value': 'd', //规定 input 元素的值
                                'disabled': false, //是否禁用
                                'checked': false //是否选中
                            }
                        ]
                    }
                },
                {
                    'type': 'checkbox', //表单类型
                    'label': '原始复选框', //表单描述
                    'name': 'checkbox',
                    'options': {
                        data: [
                            {
                                'title': '写', //自定义文本
                                'value': '1', //规定 input 元素的值 checkbox 不需要填写
                                'laySkin': 'primary', //checkbox类型下可选择 switch（开关风格） primary（原始风格）
                                'layText': '', //lay-text可自定义开关两种状态的文本 例如：开|关
                                'disabled': false, //是否禁用
                                'checked': false //是否选中
                            },
                            {
                                'title': '读', //自定义文本
                                'value': '2', //规定 input 元素的值
                                'laySkin': 'primary', //switch（开关风格） primary（原始风格）
                                'layText': '', //lay-text可自定义开关两种状态的文本
                                'disabled': true, //是否禁用
                                'checked': true //是否选中
                            },
                            {
                                'title': '听', //自定义文本
                                'value': '4', //规定 input 元素的值
                                'laySkin': 'primary', //switch（开关风格） primary（原始风格）
                                'layText': '', //lay-text可自定义开关两种状态的文本
                                'disabled': true, //是否禁用
                                'checked': false //是否选中
                            },
                            {
                                'title': '看', //自定义文本
                                'value': '3', //规定 input 元素的值
                                'laySkin': 'primary', //switch（开关风格） primary（原始风格）
                                'layText': '', //lay-text可自定义开关两种状态的文本
                                'disabled': false, //是否禁用
                                'checked': true //是否选中
                            }
                        ]
                    }
                },
                {
                    'type': 'checkbox', //表单类型
                    'label': '开关复选框', //表单描述
                    'name': 'switch',
                    'options': {
                        data: [
                            {
                                'value': '1', //规定 input 元素的值 checkbox 不需要填写
                                'laySkin': 'switch', //checkbox类型下可选择 switch（开关风格） primary（原始风格）
                                'layText': '原创|非原创', //lay-text可自定义开关两种状态的文本 例如：开|关
                                'disabled': false, //是否禁用
                                'checked': false //是否选中
                            },
                            {
                                'value': '2', //规定 input 元素的值 checkbox 不需要填写
                                'laySkin': 'switch', //checkbox类型下可选择 switch（开关风格） primary（原始风格）
                                'layText': '可行|不可行', //lay-text可自定义开关两种状态的文本 例如：开|关
                                'disabled': true, //是否禁用
                                'checked': true //是否选中
                            },
                            {
                                'value': '4', //规定 input 元素的值 checkbox 不需要填写
                                'laySkin': 'switch', //checkbox类型下可选择 switch（开关风格） primary（原始风格）
                                'layText': '是|否', //lay-text可自定义开关两种状态的文本 例如：开|关
                                'disabled': true, //是否禁用
                                'checked': false //是否选中
                            },
                            {
                                'value': '3', //规定 input 元素的值 checkbox 不需要填写
                                'laySkin': 'switch', //checkbox类型下可选择 switch（开关风格） primary（原始风格）
                                'layText': '开|关', //lay-text可自定义开关两种状态的文本 例如：开|关
                                'disabled': false, //是否禁用
                                'checked': true //是否选中
                            }
                        ]
                    }
                },
                {
                    'type': 'checkbox', //表单类型
                    'label': '默认复选框', //表单描述
                    'name': 'default',
                    'options': {
                        data: [
                            {
                                'title': '看书', //自定义文本
                                'value': '1', //规定 input 元素的值 checkbox 不需要填写
                                'laySkin': '', //checkbox类型下可选择 switch（开关风格） primary（原始风格）
                                'layText': '', //lay-text可自定义开关两种状态的文本 例如：开|关
                                'disabled': false, //是否禁用
                                'checked': false //是否选中
                            },
                            {
                                'title': '写作业', //自定义文本
                                'value': '2', //规定 input 元素的值 checkbox 不需要填写
                                'laySkin': '', //checkbox类型下可选择 switch（开关风格） primary（原始风格）
                                'layText': '', //lay-text可自定义开关两种状态的文本 例如：开|关
                                'disabled': true, //是否禁用
                                'checked': true //是否选中
                            },
                            {
                                'title': '玩游戏', //自定义文本
                                'value': '4', //规定 input 元素的值 checkbox 不需要填写
                                'laySkin': '', //checkbox类型下可选择 switch（开关风格） primary（原始风格）
                                'layText': '', //lay-text可自定义开关两种状态的文本 例如：开|关
                                'disabled': true, //是否禁用
                                'checked': false //是否选中
                            },
                            {
                                'title': '发呆', //自定义文本
                                'value': '3', //规定 input 元素的值 checkbox 不需要填写
                                'laySkin': '', //checkbox类型下可选择 switch（开关风格） primary（原始风格）
                                'layText': '', //lay-text可自定义开关两种状态的文本 例如：开|关
                                'disabled': false, //是否禁用
                                'checked': true //是否选中
                            }
                        ]
                    }
                },
                {
                    'type': 'textarea', //表单类型
                    'label': '文本域', //表单描述
                    'name': 'textarea',
                    'layVerify': {
                        name: 'required',
                        rules: function (value) {
                            var msg;
                            $.ajax({
                                async: false, //改为同步请求
                                url: './data.json',
                                dataType: 'json',
                                type: 'get',
                                success: function (result) {
                                    if (!value) {
                                        msg = result.msg;
                                    }
                                }
                            });
                            return msg;
                        }
                    }, //表单验证 required（必填项）phone（手机号）email（邮箱）url（网址）number（数字）date（日期）identity（身份证）
                    options: {
                        'placeholder': '', //表单描述
                        'disabled': false, //是否禁用
                        'readonly': false //是否只读
                    }
                },
                {
                    type: 'custom',
                    name: 'psd',
                    customHtml: $('#item').html(),
                    'layVerify': {
                        name: 'aaa',
                        rules: function (value) {
                            if (!value) {
                                return "必填项";
                            }
                        }
                    }
                },
                {
                    type: 'date',
                    'label': '日期', //表单描述
                    'name': 'date',
                    'layVerify': {
                        name: 'bbb',
                        rules: function (value) {
                            if (!value) {
                                return "日期必填项";
                            }
                        }
                    },
                    options: {
                        id: 'ddd',
                        disabled: false,
                        placeholder: '请选择时间',
                        // value: '1999-01-10',
                        done: function (val) {
                            console.log(val);
                        }
                    }
                },
                {
                    type: 'custom',
                    name: 'formbtn',
                    customHtml: $('#formBtn').html()
                }
            ]
        });
        forms.on('submit(submit)', function (obj) {
            console.log(obj);
        });
        forms.on('select', function (obj) {
            console.log(obj);
        });
        forms.on('checkbox', function (obj) {
            console.log(obj);
        });
        forms.on('switch', function (obj) {
            console.log(obj);
        });
        forms.on('radio', function (obj) {
            console.log(obj);
        });
    });
    // })(window.layui);
});
