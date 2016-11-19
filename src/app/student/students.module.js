'use strict';

var angular = require('angular');
var config = require('../config/config');
var notifications = require('../notifications/notifications');
var uiRouter = require('angular-ui-router');

module.exports = angular.module('fa.students', [
  config.name,
  notifications.name,
  uiRouter
]);
