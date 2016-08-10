'use strict';

var configModule = angular.module('app.config', []);

var configData = {
  generalConfig: {
    apiUrl: 'http://192.168.99.100:3000/'
  }
};

angular.forEach(configData, function configInit(key, value) {
  configModule.constant(value, key);
});
