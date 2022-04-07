const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/chunk-[contenthash].js",
    clean: true,
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      assets: "~/assets",
      tools: "~/tools",
    },
    // 引入文件时省略后缀
    extensions: [".js", ".ts", ".less", ".scss", ".vue"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "styles/chunk-[contenthash].css",
      ignoreOrder: true,
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        // css 匹配文件后缀规则
        test: /\.(css|s[cs]ss)$/,
        use: [
          // 注意：loader 执行顺讯是从右至左
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: "asset",
        parser: {
          // 转 base64 条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          // 打包到 dist/image 文件夹下
          filename: "images/[contenthash][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },
  devServer: {
    port: 3000,
    open: true,
  },
};
