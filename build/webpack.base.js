const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/chunk-[contenthash].js",
    clean: true,
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
    new ProgressBarPlugin({
      format: ` build [:bar] ${chalk.green.bold(
        ":percent"
      )} (:elapsed seconds)`,
    }),
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
          // 小图片转 base64
          dataUrlCondition: {
            maxSize: 25 * 1024, // 低于 25kb 会被转为 base64
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
        use: ["cache-loader", "thread-loader", "babel-loader"],
        // 使用 exclude 排除指定文件夹
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
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
};
