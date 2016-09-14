'use strict';

var errorHandling = require('./error-handling.module');

var config = function config($httpProvider) {
  $httpProvider.interceptors.push('httpErrorHandler');
};

config.$inject = ['$httpProvider'];

errorHandling.config(config);
