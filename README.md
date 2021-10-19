# acasia-poster

This is a poster generator for ApacheCon Asia 2021. [[Run]](http://zhangwenli.com/acasia-poster/)

It provides a form to input the name, title and other information so that each speaker of the event can generate their own poster easily with auto-completion.

## Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project to `docs`
$ npm run generate
```

## Adapt To Your Own Events

1. Change `router.base` in `nuxt.config.js` to be the base of your server path
2. Change the form in `pages/index.vue`.
3. If you need auto-completion of the form, change `pages/data` and the logic with `trackZh` and `trackEn` in `pages/index.vue`.
4. If you are looking for a tool to generate QR code with different reference information in the URL, please check out [Ovilia/qr-baker](https://github.com/Ovilia/qr-baker/blob/main/index.js).

## Framework

This repo uses [NuxtJS](https://nuxtjs.org/).

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## 需求

就是在最开始添加一个身份类别，如讲师、出品人、志愿者、组委会、赞助伙伴、媒体伙伴、社区伙伴... (可以下拉菜单选择或自行填写)...

如果是讲师身份，那就是现在海报的内容，如分论坛、演讲题目...

如果是出品人、志愿者、组委会成员、赞助伙伴、媒体伙伴、社区伙伴...等，就不必再填写演讲信息了

## 2021.10.20

Done
1. 彻底拆分原海报模版，使所有文字、图标、背景均易于定制；
2. 抛弃人像照可调整位置的体验设计（该设计在移动端存在bug），强制需上传正方形人像照，简化用户体验；
3. 将表单用标签页进行管理，用户操作一目了然；
4. 演讲内容支持markdown语法；
5. 添加根据url自动生成二维码的功能；

To do
1. 由于em体系存在问题，海报自适应系统不能正常运作，暂时固定海报长宽；该设计不影响当前用户体验，是否要实现待定；
2. 当输入多行内容的时候，暂未实现根据容器自动调整字体；该设计不影响当前用户体验，是否要实现待定；
3. 原海报生成算法使用第三方库，该库性能还有改进空间（目前速度略慢）；该设计不影响当前用户体验，是否要实现待定；

