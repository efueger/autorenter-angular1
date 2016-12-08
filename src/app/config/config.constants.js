'use strict';

var configModule = require('./config.module');

var configData = {
  generalConfig: {
    apiUrl: 'http://192.168.99.100:3000/',
    sourcePathRoot: 'app/'
  }
};

angular.forEach(configData, function configInit(key, value) {
  configModule.constant(value, key);
});
