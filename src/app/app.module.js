'use strict';

var angular = require('angular');
var appCommon = require('./common/app.common.module');
var appConfig = require('./app.config');
var students = require('./student/students');

var app = angular.module('app', [
  appConfig.name,
  'ui.router',
  appCommon.name,
  students.name
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function configureRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('student', {
        url: '/',
        templateUrl: 'app/students.html',
        controller: 'StudentCtrl',
        controllerAs: 'student'
      });

    $urlRouterProvider.otherwise('/');
  }]);

app.run();
