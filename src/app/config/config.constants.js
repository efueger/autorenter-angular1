'use strict';

var angular = require('angular');
var configModule = require('./config.module');

var configData = {
  generalConfig: {
    apiUrl: 'http://127.0.0.1:3000/api/',
    sourcePathRoot: 'app/'
  }
};

angular.forEach(configData, function configInit(key, value) {
  configModule.constant(value, key);
});
