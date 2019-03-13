###运行说明
1. npm i
2. npm install -g concurrently
3. npm run start

# 前端工程化后续计划

----
- [x] #### 问题1：改变代码时所有的 chunkhash 都会改变？
描述：理想状态希望，非公共模块改动时，只用替换某几个文件就能完成上线工作，从而最大利用缓存<br />解决方案：webpack好像有这方面的功能，会基于文件内容生成对应的文件hash名，当文件没有改动时，hash值是不会改变的<br />通过配置各类webpack插件解决<br />[Vendor chunk hash varies when app chunk changes](https://github.com/webpack/webpack/issues/1150)

- [x] #### 问题2：公共的css，还没有额外输出为一个文件；postcss 插件引入
解决方案：webpack配置优化

#### 问题3：static 文件有些可以再压缩
描述：现在layui和自定义layui组件是，放在static文件中引入，希望通过webpack统一管理

- [x] #### 问题4：资源地址问题
准备将启动有关的地址全改为绝对地址，利于后续文件维护<br />但是不知道会对性能有多大影响(暂时没发现多大影响)

#### 问题5：采用require（实际上是webpack的require）的方式，拆分组件后，组件间怎么相互通信


#### 目录结构说明
├─bin
│  ├─build//生产环境配置中心
│  │  └─compile//tpl编译中心
│  ├─config
│  ├─dataSource//开发环境数据
│  ├─lib
│  ├─server//开发环境
│  │  ├─module
│  │  └─routes
│  └─utils
├─dist
├─src
│  ├─imgs
│  ├─scripts
│  │  ├─components//复用组件（结合业务）
│  │  │  └─dialog
│  │  │      ├─css
│  │  │      ├─img
│  │  │      └─tmpl
│  │  └─page//各页面entry
│  ├─styles
│  │  ├─base//基础样式
│  │  ├─lib//第三方引用
│  │  │  └─layui
│  │  │      ├─css
│  │  │      │  └─modules
│  │  │      │      ├─laydate
│  │  │      │      │  └─default
│  │  │      │      └─layer
│  │  │      │          └─default
│  │  │      └─font
│  │  └─page//各页面样式
│  ├─utils//公共方法
│  └─views//各页面tpl
│      └─common
│          └─module
├─static
│  ├─components//已封装基于layui组件
│  │  └─modules
│  │      ├─djcpsAlert
│  │      ├─djcpsCarousel
│  │      ├─djcpsConfirm
│  │      ├─djcpsDate
│  │      ├─djcpsFlow
│  │      ├─djcpsForm
│  │      ├─djcpsLoad
│  │      ├─djcpsModal
│  │      ├─djcpsMsg
│  │      ├─djcpsPage
│  │      ├─djcpsPanel
│  │      ├─djcpsProgress
│  │      ├─djcpsTable
│  │      ├─djcpsTips
│  │      ├─djcpsTree
│  │      └─djcpsUpload
│  ├─images
│  ├─js
│  └─lib
│      └─layui
│          ├─css
│          │  └─modules
│          │      ├─laydate
│          │      │  └─default
│          │      └─layer
│          │          └─default
│          ├─font
│          ├─images
│          │  └─face
│          └─lay
│              └─modules
├─temp_views // webpack-dev-server临时生成的tpl文件夹，用于监听页面模板变化
└─test
    ├─arttemplate_test//tpl测试
    └─unit//单元测试
        └─specs
