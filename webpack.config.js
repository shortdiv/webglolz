const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
      }
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/glsl/triangle.html',
    inject: 'body',
  })],
  devServer: {
    contentBase: 'dist/',
    port: 9000
  }
}
