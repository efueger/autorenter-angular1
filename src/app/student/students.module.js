'use strict';

var angular = require('angular');
var config = require('../config/config');
var notifications = require('../notifications/notifications');

module.exports = angular.module('fa.students', [
  config.name,
  notifications.name
]);
