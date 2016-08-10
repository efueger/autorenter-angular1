'use strict';

var angular = require('angular');

// components
var appCommon = require('./common/app.common.module');
var students = require('./student/students');

module.exports =  angular.module('app', [
  'ui.router',
  appCommon.name,
  students.name
]);
