const crypto = require("crypto");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const createHash = crypto.createHash;
crypto.createHash = (algorithm) =>
  createHash(algorithm == "md4" ? "sha256" : algorithm);

module.exports = {
  mode: "development",
  devServer: {
    contentBase: `${path.resolve(__dirname)}/dist`,
    port: 8081,
    open: true,
    // static: {
    //   directory: path.join(__dirname, 'public'),
    // },
    host: process.env.HOST_MACHINE_IP || "0.0.0.0",
    compress: true,
    disableHostCheck: true,
    stats: {
      all: false,
      warnings: true,
      errors: true,
      errorDetails: true,
      colors: true,
      chunks: true,
      warningsFilter: /Conflicting order/,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
      "X-Webpack-Dev-Server": "1",
    },
  },
  devtool: "cheap-module-eval-source-map",
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: "common",
          minChunks: 3,
          chunks: "initial",
          test: /.js/,
        },
      },
    },
  },
  entry: {
    main: "./src/main.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    sourceMapFilename: "[name].[contenthash].js.map",
    path: path.resolve(__dirname, "dist"),
    publicPath: process.env.WEBPACK_HOST || "/",
    libraryTarget: "umd",
    library: "[name]",
    umdNamedDefine: true,
    globalObject: "this",
  },
  resolve: {
    extensions: [".json", ".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?!\/(webpack-dev-server))/,
        use: "babel-loader",
      },

      {
        test: /node_modules\/(jsdom|node-fetch)/,
        use: "null-loader",
      },

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
    }),
  ],
};
