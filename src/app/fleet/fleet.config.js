'use strict';

var fleet = require('./fleet.module');

function fleetRouteConfig($stateProvider) {
  $stateProvider
    .state('fleet', {
      abstract: true,
      views: {
        'moduleHeader@': {
          templateUrl: 'app/fleet.header.html'
        }
      }
    })
    .state('fleet.locations', {
      abstract: true
    })
    .state('fleet.locations.list', {
      url: '/fleet/locations',
      views: {
        '@': {
          templateUrl: 'app/fleet-locations.html',
          controller: 'FleetLocationsController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: 'Locations'
      }
    })
    .state('fleet.reports', {
      abstract: true
    })
    .state('fleet.reports.list', {
      url: '/fleet/reports',
      views: {
        '@': {
          templateUrl: 'app/fleet-reports.html',
          controller: 'FleetReportsController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: 'Reports'
      }
    });
}

fleet.config(['$stateProvider', fleetRouteConfig]);
