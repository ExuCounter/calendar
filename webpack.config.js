const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.ts",
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
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
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
          },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      { test: /\.(gif|png|jpe?g|svg)$/i, use: "image-webpack-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
}
