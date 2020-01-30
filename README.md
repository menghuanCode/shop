# shop

### 技术栈
#### css
sass
postcss
lib-flexiable
#### js
vant
vuex
vue-router


### 2020/1/19 
0. postcss 引入 `autoprefixer` 和 `postcss-px-to-viewport` 实现低版本样式兼容和 px像素 转 vw、vh 单位
0. ~~lib-flexible~~ 转 `amfe-flexiable`, 配合 postcss-px-to-viewport 使用


### v0.0.1
0. 仿饿了么实现地址选择组件
0. 刪除 ~~van-search~~組件，自己手写 search 控件

### v0.0.2
0. 修复城市列表一开始不显示问题
0. 修复当页面大小切换时，城市列表样式问题
0. 关闭 vant indexBar 插件的 sticky 功能，在当前版本有bug


### v0.0.3
0. 实现首页（50%）
0. 优化选择城市的显示
0. 使用 Vuex

### v0.0.4
0. 修复 Addrees Seletor 选择城市样式问题
0. 完成 shop、shopActivity, rates 组件模板

### v0.0.5
0. 实现登录页面

### v0.0.6 
0. 修复手机端无法选择城市的bug
0. 优化城市选择的体验效果
0. 新增收货地址、我的订单、我的、个人中心等页面


### v0.0.7
0. 全面优化城市选择控件，实现无卡顿效果
