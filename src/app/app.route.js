'use strict';

var app = require('./app.module');

function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('student', {
    url: '/',
    templateUrl: 'app/students.html',
    controller: 'StudentsController',
    controllerAs: 'studentsController'
  });

  $urlRouterProvider.otherwise('/');
}

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

app.config(routeConfig);
