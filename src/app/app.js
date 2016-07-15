(function init() {
  'use strict';

  angular.module('app.common.navbar', []);
  angular.module('app.components.student', []);

  var app = angular.module('app', [
    'ui.router',
    'app.common.navbar',
    'app.components.student'
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
