'use strict';

require('angularjs-toaster');
var strings = require('../imports/strings.import.js');

module.exports = angular.module('fa.notifications', [
  'toaster',
  strings.name
]);
