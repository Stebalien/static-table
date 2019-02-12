const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CSV Viewer'
    })
  ]
}
