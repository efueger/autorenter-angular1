'use strict';

var techSupport = require('./tech-support.module');
var techSupportTemplate = require('./tech-support.html');

function techSupportRouteConfig($stateProvider) {
  $stateProvider
    .state('tech-support', {
      url: '/tech-support',
      views: {
        '@': {
          template: techSupportTemplate,
          controller: 'TechSupportController',
          controllerAs: 'techSupportController'
        }
      }
    });
}

techSupportRouteConfig.$inject = ['$stateProvider'];

techSupport.config(techSupportRouteConfig);
