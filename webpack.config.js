var path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.resolve(__dirname, "script.js"),
  output: {
    path: path.resolve(__dirname, "output"),
    filename: "main.js",
  },
  mode: "production",
  plugins: [new MiniCssExtractPlugin({ filename: "styles/[name].css" })],
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
