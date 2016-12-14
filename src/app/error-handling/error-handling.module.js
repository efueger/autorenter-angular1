'use strict';

var angular = require('angular');
var notifications = require('../notifications/notifications');

module.exports = angular.module('fa.errorHandling', [
  notifications.name
]);

