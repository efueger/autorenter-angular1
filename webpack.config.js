var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var args = require('yargs').argv;
var validate = require('webpack-validator');

var isProd = args.prod;

var base = __dirname;
var entryJs = base + '/src/app/app.js';
var appName = 'app';

var plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    _: 'lodash'
  }),
  new webpack.DefinePlugin({
    __PROD__: isProd
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', isProd ? 'vendor.[hash].js' : 'vendor.js'),
  new ExtractTextPlugin(isProd ? '[name].[hash].css' : '[name].css'),
  new HtmlWebpackPlugin( {
    template: base + '/src/index.html',
    chunks: ['app', 'vendor'],
    favicon: base + '/src/assets/img/favicon.ico',
    appName: appName
  }),
  new webpack.HotModuleReplacementPlugin({
    multiStep: true
  })
];

if (isProd) {
  plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  );
}

var config = {
  entry: {
    app: [
      entryJs,
      'webpack/hot/dev-server'
    ],
    vendor: [
      // 3rd dependencies
      'bootstrap',
      'fa-strings.js',

      // angular
      'angular',
      'angular-breadcrumb',
      'angular-ui-bootstrap',
      'angular-ui-grid',
      'angular-ui-router',
      'angularjs-toaster',
      'angular-mocks',
      'angulartics'
    ]
  },
  output: {
    path: base + '/dist',
    filename: isProd ? '[name].[hash].js' : '[name].js',
    chunkFilename: isProd ? '[name].[hash].chunk.js' : '[name].chunk.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'ng-annotate?add=true',
        exclude: /node_modules/
      },
      {
        test: /.html$/,
        loader: 'html',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap|postcss')
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
        loader: 'file?name=assets/fonts/[name].[ext]?[hash]'
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url?limit=8192&name=assets/images/[name].[hash].[ext]'
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc',
    failOnError: true
  },
  plugins: plugins,
  debug: !isProd,
  devtool: isProd ? 'source-map' : 'eval-source-map',
  devServer: {
    contentBase: base + '/dist',
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    },
    host: '127.0.0.1',
    port: 8080
  },
  postcss: function postcss() {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })];
  }
};

module.exports = validate(config, {quiet: true});
