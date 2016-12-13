'use strict';

var app = require('./app.module.js');
var mainTemplate = require('./main/main.html');

function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: '/',
    template: mainTemplate,
    controller: 'MainController',
    controllerAs: 'vm'
  });

  $urlRouterProvider.otherwise('/');
}

routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

app.config(routeConfig);
