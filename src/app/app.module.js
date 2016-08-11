'use strict';

var angular = require('angular');
require('angular-ui-router');

// components
var appConfig = require('./config/app.config');
var appCommon = require('./common/app.common');
var students = require('./student/students');
var navBar = require('./nav-bar/nav-bar');

module.exports =  angular.module('app', [
  'ui.router',
  appConfig.name,
  appCommon.name,
  students.name,
  navBar.name
]);
