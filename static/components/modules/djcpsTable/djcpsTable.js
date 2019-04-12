layui.define('table', function (exports) {
    "use strict";
    var table = layui.table;
    var data = {
        "code": 0,
        "msg": "",
        "count": 3000000,
        "data": [{
            "id": "10001",
            "username": "杜甫",
            "email": "xianxin@layui.com",
            "sex": "男",
            "city": "浙江杭州",
            "sign": "点击此处，显示更多。当内容超出时，点击单元格会自动显示更多内容。",
            "experience": "116",
            "ip": "192.168.0.8",
            "logins": "108",
            "joinTime": "2016-10-14"
        }, {
            "id": "10002",
            "username": "李白",
            "email": "xianxin@layui.com",
            "sex": "男",
            "city": "浙江杭州",
            "sign": "君不见，黄河之水天上来，奔流到海不复回。 君不见，高堂明镜悲白发，朝如青丝暮成雪。 人生得意须尽欢，莫使金樽空对月。 天生我材必有用，千金散尽还复来。 烹羊宰牛且为乐，会须一饮三百杯。 岑夫子，丹丘生，将进酒，杯莫停。 与君歌一曲，请君为我倾耳听。(倾耳听 一作：侧耳听) 钟鼓馔玉不足贵，但愿长醉不复醒。(不足贵 一作：何足贵；不复醒 一作：不愿醒/不用醒) 古来圣贤皆寂寞，惟有饮者留其名。(古来 一作：自古；惟 通：唯) 陈王昔时宴平乐，斗酒十千恣欢谑。 主人何为言少钱，径须沽取对君酌。 五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。",
            "experience": "12",
            "ip": "192.168.0.8", "logins": "106"
            , "joinTime": "2016-10-14"
            , "LAY_CHECKED": true
        }, {
            "id": "10003"
            , "username": "王勃"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "65"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        }, {
            "id": "10004"
            , "username": "李清照"
            , "email": "xianxin@layui.com"
            , "sex": "女"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "666"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        }, {
            "id": "10005"
            , "username": "冰心"
            , "email": "xianxin@layui.com"
            , "sex": "女"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "86"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        }, {
            "id": "10006"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "12"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        }, {
            "id": "10007"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "16"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        }, {
            "id": "10008"
            , "username": "贤心"
            , "email": "xianxin@layui.com"
            , "sex": "男"
            , "city": "浙江杭州"
            , "sign": "人生恰似一场修行"
            , "experience": "106"
            , "ip": "192.168.0.8"
            , "logins": "106"
            , "joinTime": "2016-10-14"
        }]
    }
    var djcpsTable = {
    
    };
    var mainFn = function (options) {
        var that = this;
        that.loadHtml().then(function () {
            that.initTable();
        });
    };
    mainFn.prototype.loadHtml = function () {
        var defer = $.Deferred();
        if ($('#tableCss').length > 0) {
            defer.resolve();
        } else {
            $.ajax({
                url: "static/components/modules/djcpsTable/djcpsTable.html",
                async: false,
                success: function (result) {
                    $('body').append(result);
                    defer.resolve();
                }
            });
        }
        return defer.promise();
    };
    mainFn.prototype.initTable = function () {
        table.render({
            elem: '#table',
            data: data.data,
            toolbar: '#toolbarDemo',
            title: '用户数据表',
            totalRow: true,
            cols: [[
                { type: 'checkbox', fixed: 'left' },
                { field: 'id', title: 'ID', width: 80, fixed: 'left', unresize: true, sort: true, totalRowText: '合计' },
                { field: 'username', title: '用户名', width: 120, edit: 'text' },
                {
                    field: 'email', title: '邮箱', width: 150, edit: 'text', templet: function (res) {
                        return '<em>' + res.email + '</em>'
                    }
                },
                { field: 'experience', title: '积分', width: 80, sort: true, totalRow: true },
                { field: 'sex', title: '性别', width: 80, edit: 'text', sort: true },
                { field: 'logins', title: '登入次数', width: 100, sort: true, totalRow: true },
                { field: 'sign', title: '签名' },
                { field: 'city', title: '城市', width: 100 },
                { field: 'ip', title: 'IP', width: 120 },
                { field: 'joinTime', title: '加入时间', width: 120 },
                { fixed: 'right', title: '操作', toolbar: '#barDemo', width: 150 }
            ]]
            , page: true
        });
        //工具栏事件
        table.on('toolbar(test)', function (obj) {
            var checkStatus = table.checkStatus(obj.config.id);
            switch (obj.event) {
                case 'getCheckData':
                    var data = checkStatus.data;
                    layer.alert(JSON.stringify(data));
                    break;
                case 'getCheckLength':
                    var data = checkStatus.data;
                    layer.msg('选中了：' + data.length + ' 个');
                    break;
                case 'isAll':
                    layer.msg(checkStatus.isAll ? '全选' : '未全选')
                    break;
            };
        });
    }
    //组件入口
    djcpsTable.init = function (options) {
        var inst = new mainFn(options);
        return inst;
    };
    //输出组件
    exports('djcpsTable', djcpsTable);
});
