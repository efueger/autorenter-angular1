'use strict';

var app = require('./app.module');

function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: '/',
    templateUrl: 'app/main.html',
    controller: 'MainController',
    controllerAs: 'vm'
  });

  $urlRouterProvider.otherwise('/');
}

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

app.config(routeConfig);
