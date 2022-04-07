const { DefinePlugin, HotModuleReplacementPlugin } = require("webpack");
const { merge } = require("webpack-merge");
const base = require("./webpack.base");

module.exports = merge(base, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  plugins: [
    new DefinePlugin({
      NODE_DEV: JSON.stringify("development"),
    }),
    new HotModuleReplacementPlugin(),
  ],
});
