# wujie-vue-webpack

webpack 打包配置基础及优化

## 基础配置内容包括
项目根目录创建一个 build 文件夹，定义 `webpack.base`、`webpack.dev`、`webpack.prod` 三个文件，base 定义通用配置，dev 和 prod 定义开发和生产环境的配置

base 文件定义
- webpack 的打包入口 entry，一般是 `main.js`
- webpack 的打包出口 output，一般是 `dist` 目录
- 配置打包 html 的插件，html-webpack-plugin
- 配置打包 css 的 loader 和 plugins，css-loader，mini-css-extract-plugin（css 打包成一个单独的文件），less 或者 less 的 loader
- 打包静态资源，webpack5 使用的是 asset-module
- 配置 babel，兼容更低版本的浏览器
- 打包 vue 的 loader 和 plugins，vue-loader，vue-template-conpiler（解析 vue 的模板工具），@vue/babel-preset-jsx（解析 vue 的 jsx 语法）
- 配置路径别名 alias，定义加载进度条

dev 文件定义
- 使用 webpack merge 合并 base 文件配置
- 配置 webpack-dev-server 开发模式，自动重新打包
- 配置 source-map，使用 `eval-cheap-module-source-map` 模式，能定位源码位置和展示

prod 文件定义配置
- 使用 webpack merge 合并 base 文件配置
- 配置 source-map，使用 `nosources-source-map` 模式，只能定位源码位置


## 优化配置
base 文件中的优化
- 使用 thread-loader 开启多进程打包、cache-loader 缓存资源
- 使用 exclude & include 排除不需要的文件，或者只引入需要的文件
- 使用 webpack 自带的 asset-module 将小图片转成 base64

dev 阶段优化
- 使用 webpack 自带的 HotModuleReplacementPlugin 实现热更新

prod 阶段优化
- 使用 css-minimizer-webpack-plugin 压缩 css 文件体积
- 使用 terser-webpack-plugin 压缩 JS 文件体积
- 开启 Tree-Shaking (Webpack 5 默认开启)
- 开启 gzip
- 使用 webpack-bundle-analyzer 分析打包文件体积
