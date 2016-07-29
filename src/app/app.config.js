(function init() {
  'use strict';

  var app = angular.module('app');

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function configureRoutes($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('student', {
          url: '/',
          templateUrl: 'app/students.html',
          controller: 'StudentsController',
          controllerAs: 'students'
        });

      $urlRouterProvider.otherwise('/');
    }]);
}());
