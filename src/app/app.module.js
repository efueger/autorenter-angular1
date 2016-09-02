'use strict';

var angular = require('angular');
require('angular-ui-router');

// components
var config = require('./config/config');
var logging = require('./logging/logging');
var errorHandling = require('./error-handling/error-handling');
var students = require('./student/students');
var admin = require('./admin/admin');
var fleet = require('./fleet/fleet');
var navBar = require('./nav-bar/nav-bar');

module.exports =  angular.module('app', [
  'ui.router',
  config.name,
  logging.name,
  errorHandling.name,
  students.name,
  admin.name,
  fleet.name,
  navBar.name
]);
