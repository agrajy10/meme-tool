const path = require("path");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/app.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true, //emty dist dir after each build,
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 5001,
    open: true,
    hot: true
  },
  devtool : 'inline-source-map',
};
