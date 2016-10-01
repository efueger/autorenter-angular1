'use strict';

/**
 * @ngdoc module
 * @name fa.fleet
 * @description
 *
 * The `fa.fleet` module adds the core AutoRenter fleet management functionality.
 */

var angular = require('angular');
var uiRouter = require('angular-ui-router');
var dataAccess = require('../data-access/data-access');

module.exports = angular.module('fa.fleet',
  [
    uiRouter,
    'ui.grid',
    'ui.grid.resizeColumns',
    dataAccess.name
  ]);
