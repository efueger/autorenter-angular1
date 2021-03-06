var path = require('path');
var args = require('yargs').argv;
var webpack = require('webpack');

var unitTestEntry = 'src/app/specs.webpack.js';

// run multiple times in watch mode
var singleRun = !args.watch;

// use phantomjs in watch mode
var browser = 'PhantomJS';

var files = [unitTestEntry];
var include = [path.resolve('./src')];

var isProd = args.prod;

var webpackPlugins = [
  new webpack.DefinePlugin({
    __PROD__: isProd
  })];

var preLoaders = [
  // Process all non-test code with Isparta
  {test: /\.js$/, loader: 'isparta', include: include, exclude: /\.spec\.js$/},
  {test: /sinon.*\.js$/,   loader: 'imports?define=>false,require=>false'}
];
var loaders = [
  {test: /\.(png|jpg)$/, loader: 'null'},
  {test: /\.(html)$/, loader: 'html'}
];
var processors = {};
processors[unitTestEntry] = ['webpack', 'sourcemap'];
processors['src/app/**/*.js'] = ['webpack', 'sourcemap'];

var reporters = args.ci ? [
  'mocha', 'coverage', 'bamboo'
] : [
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
    frameworks: ['mocha', 'chai'],
    exclude: [],
    files: files,
    webpack: {
      devtool: 'inline-source-map',
      plugins: webpackPlugins,
      module: {
        preLoaders: preLoaders,
        loaders: loaders,
        // don't run babel-loader through the sinon module
        noParse: [
          /node_modules\/sinon\//
        ]
      },
      cache: true,
      resolve: {
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      }
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
