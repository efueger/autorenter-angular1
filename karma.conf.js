var path = require('path');
var webpack = require('webpack');
var args = require('yargs').argv;

var unitTestEntry = 'src/app/specs.webpack.js';
// run multiple times in watch mode
var singleRun = !args.watch;
// use phantomjs in watch mode
var browser = 'PhantomJS';
var files = [unitTestEntry];
var include = [path.resolve('./source')];

var preLoaders = [
  // Process all non-test code with Isparta
  {test: /\.js$/, loader: 'isparta', include: include, exclude: /\.spec\.js$/}
];
var loaders = [
  {test: /\.(png|jpg)$/, loader: 'null'},
  {test: /\.(html)$/, loader: 'null'}
];
var processors = {};
processors[unitTestEntry] = ['webpack', 'sourcemap'];
processors['src/app/**/*.js'] = ['webpack', 'sourcemap'];

var reporters = [
  'mocha', 'coverage'
];
var coverageReporters = args.watch ? [
  {type: 'text-summary'}
] : [
  {type: 'lcov', subdir: '.'},
  {type: 'text-summary'}
];

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '.',
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    exclude: [],
    files: files,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        preLoaders: preLoaders,
        loaders: loaders
      },
      cache: true,
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          _: 'lodash'
        })
      ]
    },
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true
      }
    },
    preprocessors: processors,
    reporters: reporters,
    coverageReporter: {
      dir: './coverage',
      reporters: coverageReporters
    },
    reportSlowerThan: 500,
    singleRun: singleRun,
    browsers: [browser]
  });
};
