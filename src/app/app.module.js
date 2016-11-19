'use strict';

var angular = require('angular');
require('angular-ui-router');
require('angular-breadcrumb');

// components
var config = require('./config/config');
var logging = require('./logging/logging');
var errorHandling = require('./error-handling/error-handling');
var notifications = require('./notifications/notifications');
var confirmations = require('./confirmations/confirmations');
var students = require('./student/students');
var main = require('./main/main');
var admin = require('./admin/admin');
var fleet = require('./fleet/fleet');
var navBar = require('./nav-bar/nav-bar');

module.exports =  angular.module('app', [
  'ui.router',
  'ncy-angular-breadcrumb',
  config.name,
  logging.name,
  errorHandling.name,
  notifications.name,
  confirmations.name,
  students.name,
  main.name,
  admin.name,
  fleet.name,
  navBar.name
]);
