'use strict';

var configModule = require('./config.module');

var configData = {
  generalConfig: {
    apiUrlRoot: 'http://127.0.0.1:3000/api/',
    sourcePathRoot: 'app/'
  }
};

angular.forEach(configData, function configInit(key, value) {
  configModule.constant(value, key);
});
