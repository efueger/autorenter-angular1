'use strict';

var errorHandling = require('./error-handling.module');

var config = function($httpProvider) {
  console.log('TODO: Remove this log of the httpErrorHandlerFactory being configured as an interceptor!!!');
  $httpProvider.interceptors.push('httpErrorHandlerFactory');
};

config.$inject = ['$httpProvider'];

errorHandling.config(config);
