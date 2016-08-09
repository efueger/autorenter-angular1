require('./logging/loggingApi.module.js');
require('../app.config');

(function appCommonInit() {
  'use strict';

  angular.module('app.common', ['loggingApi', 'app.config']);
}());
