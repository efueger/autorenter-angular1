'use strict';

var errorHandling = require('./error-handling.module');

var config = function($httpProvider) {
  $httpProvider.interceptors.push('httpErrorHandlerFactory');
};

config.$inject = ['$httpProvider'];

errorHandling.config(config);
