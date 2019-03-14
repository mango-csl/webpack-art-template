/**
 * 文件上传upload组件
 * layui-upload二次封装
 */
layui.define('upload', function (exports) {
  "use strict";
  var upload = layui.upload;
  // 定义组件
  var djcpsUpload = {
    // 初始配置
    config: {
      //指向容器选择器，dom选择器
      elem: '#upload',
      //服务端上传接口
      url: '',
      //请求上传接口的额外参数
      data: {},
      //接口的请求头
      headers: {},
      //允许上传的文件类型，file所有文件，images图片，video视频，audio音频
      accept: 'images',
      //打开文件选择框时，筛选出的文件类型,值为用逗号隔开的MIME类型列表
      //如'image/*'（只显示图片文件），'image/jpg, image/png'（只显示 jpg 和 png 文件）
      acceptMime: 'image/jpg, image/png, image/jpeg',
      //允许上传的文件后缀
      exts: 'jpg|png|jpeg',
      //是否选完文件后自动上传，若false则需设置bindAction来指向其他按钮提交上传
      auto: false,
      //作为提交上传按钮，当auto为false时使用，传入jquery的dom对象
      bindAction: $('#uploadBtn'),
      //设定文件域的字段名
      field: 'file',
      //设置文件最大可允许上传的大小，单位KB，不支持ie8/9，0为不限制
      size: 0,
      //是否允许多文件上传，不支持ie8/9
      multiple: false,
      //设置同时可上传的文件数量，一般配合multiple参数出现，0为不限制
      number: 0,
      //是否接受拖拽的文件上传，不支持ie8/9
      drag: false,
      //选择文件后的回调函数，带参数object文件信息
      choose: function (object) {
      },
      //文件提交上传前的回调
      //带参数object文件信息
      before: function (object) {
      },
      //执行上传请求后的回调
      //带参数res服务端响应信息、index当前文件的索引、upload重新上传的方法，一般在文件上传失败后使用
      done: function (res, index, upload) {
      },
      //执行上传请求出现异常的回调
      //带参数index当前文件的索引、upload重新上传的方法
      error: function (index, upload) {
      },
      //多文件上传完毕后的状态回调，只有在multiple:true时才触发
      //带参数object文件信息，total总文件数，successful上传成功文件数，aborted上传失败文件数
      allDone: function (obj) {
      }
    }
  };
  /**
   * 核心功能构造函数
   * @param {*} options 配置项
   */
  var mainFn = function (options) {
    var that = this;
    that.config = $.extend({}, djcpsUpload.config, options);
    //重写choose事件，先获取文件队列，再执行回调操作
    that.config.choose = function (object) {
      // 等待上传的文件队列
      that.files = object.pushFile();
      options.choose(object);
    };
    that.loadHtml().then(function () {
      that.initUpload();
    });
  };
  /**
   * 加载模板文件
   */
  mainFn.prototype.loadHtml = function () {
    var defer = $.Deferred();
    if ($('#uploadCss').length > 0) {
      defer.resolve();
    } else {
      $.ajax({
        url: "static/components/modules/djcpsUpload/djcpsUpload.html",
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
   * 初始化文件上传功能
   */
  mainFn.prototype.initUpload = function () {
    var that = this;
    that.upload = upload.render(that.config);
  };
  /**
   * 在choose或before阶段执行，预读待上传的所有本地文件，返回一个promise，带文件数组参数
   */
  mainFn.prototype.filePreview = function () {
    var defer = $.Deferred();
    var that = this;
    //文件数组
    var fileArr = [];
    //文件数量计数
    // var filesCount = 0;
    //已读取文件计数
    // var onloadCount = 0;
    if (window.FileReader) {
      layui.each(that.files, function (index, file) {
        var url = URL.createObjectURL(file);
        fileArr.push({
          index: index,
          file: file,
          url: url
        });
        setTimeout(function () {
          URL.revokeObjectURL(url);
        }, 0);
        defer.resolve(fileArr);
        // var reader = new FileReader();
        // reader.readAsDataURL(file);
        // filesCount++;
        // reader.onload = function () {
        //     fileArr.push({
        //         index: index,
        //         file: file,
        //         result: this.result
        //     });
        //     onloadCount++;
        //     if (filesCount === onloadCount) {
        //         defer.resolve(fileArr);
        //     }
        // };
      });
    } else {
      defer.reject();
    }
    return defer.promise();
  };
  /**
   * 在choose或before阶段执行，删除本地文件
   * @param {*} fileIndex 文件索引
   * @param {*} $dom 文件所在元素
   */
  mainFn.prototype.deleteFile = function (fileIndex, $dom) {
    var that = this;
    //删除队列文件
    delete that.files[fileIndex];
    //移除页面元素
    $dom.remove();
    //清空input file值，以免删除后出现同名文件不可选
    console.log($(that.upload.config.elem).next()[0]);
    $(that.upload.config.elem).next()[0].value = '';
  };
  mainFn.prototype.deleteAllFile = function () {
    var that = this;
    that.files = {};
  };
  /**
   * 在choose或before阶段执行，单个文件上传
   * @param {*} obj 文件信息
   * @param {*} file 单个文件信息
   * @param {*} index 文件索引
   */
  mainFn.prototype.reupload = function (obj, file, index) {
    var that = this;
    if (obj) {
      obj.upload(index, file);
    } else {
      that.upload.upload();
    }
  };
  //组件入口
  djcpsUpload.init = function (options) {
    var inst = new mainFn(options);
    return inst;
  };
  //输出组件
  exports('djcpsUpload', djcpsUpload);
});
