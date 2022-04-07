const { merge } = require("webpack-merge");
const { DefinePlugin } = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const base = require("./webpack.base");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  devtool: "nosources-source-map",
  plugins: [
    // 定义环境变量
    new DefinePlugin({
      NODE_DEV: JSON.stringify("production"),
    }),
    // 去重压缩 css
    new CssMinimizerPlugin(),
    // 压缩 JS 代码
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true, // 去除 console
        },
      },
    }),
    // 打包体积分析
    new BundleAnalyzerPlugin(),
    // 开启 gzip
    new CompressionPlugin({
      algorithm: "gzip",
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
});
