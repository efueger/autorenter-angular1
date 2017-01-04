'use strict';

var angular = require('angular');

require('../assets/css/app.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('angular-ui-bootstrap/dist/ui-bootstrap-csp.css');
require('angularjs-toaster/toaster.min.css');
require('angular-ui-grid/ui-grid.css');

require('angular-ui-router');
require('angular-breadcrumb');

// components
var config = require('./config/config');
var logging = require('./logging/logging');
var errorHandling = require('./error-handling/error-handling');
var notifications = require('./notifications/notifications');
var confirmations = require('./confirmations/confirmations');
var techSupport = require('./tech-support/tech-support');
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
  techSupport.name,
  main.name,
  admin.name,
  fleet.name,
  navBar.name
]);
