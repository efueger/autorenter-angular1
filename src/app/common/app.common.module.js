require('logging/loggingApi.module.js');

(function appCommonInit() {
  'use strict';

  angular.module('app.common', ['loggingApi', 'app.config']);
}());
