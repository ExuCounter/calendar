const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    compress: true,
    open: true,
    hot: true,
    stats: "errors-only",
    watchOptions: {
      ignored: "/node_modules/",
    },
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: { importLoaders: 1, modules: { localIdentName: "[name]__[local]__[hash:base64:7]" } },
          },
          { loader: "sass-loader" },
        ],
      },
      { test: /\.svg$/, use: "svg-url-loader" },
      { test: /\.(gif|png|jpe?g|svg)$/i, use: "image-webpack-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
}
