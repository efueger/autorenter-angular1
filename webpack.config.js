var webpack = require('webpack');

module.exports = {
  entry: './src/app/app.module.js',
  output: {
    path: __dirname,
    filename: './dist/app/app.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '_': 'lodash'
    })
  ]
};
