(function init() {
  'use strict';

  var app = angular.module('app', [
    'ui.router',
    'app.common'
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
}());
