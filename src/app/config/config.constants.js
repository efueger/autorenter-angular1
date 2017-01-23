'use strict';

var angular = require('angular');
var configModule = require('./config.module');

var configData = {
  generalConfig: {
    apiUrlRoot: __PROD__ ? 'https://autorenter-nodeexpress-api.herokuapp.com/api/' : 'http://127.0.0.1:3000/api/',
    sourcePathRoot: 'app/'
  }
};

angular.forEach(configData, function configInit(key, value) {
  configModule.constant(value, key);
});
