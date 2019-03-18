# 前端工程化后续计划

----
- [x] #### 问题1：改变代码时所有的 chunkhash 都会改变？
描述：理想状态希望，非公共模块改动时，只用替换某几个文件就能完成上线工作，从而最大利用缓存<br />解决方案：webpack好像有这方面的功能，会基于文件内容生成对应的文件hash名，当文件没有改动时，hash值是不会改变的<br />通过配置各类webpack插件解决<br />[Vendor chunk hash varies when app chunk changes](https://github.com/webpack/webpack/issues/1150)

<a name="66a38bef"></a>
- [x] #### 问题2：公共的css，还没有额外输出为一个文件；postcss 插件引入
解决方案：webpack配置优化
<a name="dd7ea4db"></a>
#### 问题3：static 文件有些可以再压缩
描述：现在layui和自定义layui组件是，放在static文件中引入，希望通过webpack统一管理

<a name="ab991bc6"></a>
- [x] #### 问题4：资源地址问题
准备将启动有关的地址全改为绝对地址，利于后续文件维护<br />但是不知道会对性能有多大影响(暂时没发现多大影响)

