'use strict';

var fleet = require('./fleet.module');
var fleetHeaderTemplate = require('./fleet.header.html');
var fleetLocationsTemplate = require('./fleet-locations.html');
var fleetLocationDetailsTemplate = require('./fleet-location-details.html');
var fleetLocationVehiclesTemplate = require('./fleet-location-vehicles.html');
var fleetReportsTemplate = require('./fleet-reports.html');

function fleetRouteConfig($stateProvider) {
  $stateProvider
    .state('fleet', {
      abstract: true,
      views: {
        'moduleHeader@': {
          template: fleetHeaderTemplate
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
          template: fleetLocationsTemplate,
          controller: 'FleetLocationsController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: 'Locations'
      }
    })
    .state('fleet.locations.add', {
      url: '/add',
      views: {
        '@': {
          template: fleetLocationDetailsTemplate,
          controller: 'FleetLocationDetailsController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: 'Add'
      },
      parent: 'fleet.locations.list'
    })
    .state('fleet.locations.view', {
      url: '/{id}/view',
      views: {
        '@': {
          template: fleetLocationDetailsTemplate,
          controller: 'FleetLocationDetailsController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: '{{::vm.location.siteId}}'
      },
      parent: 'fleet.locations.list'
    })
    .state('fleet.locations.edit', {
      url: '/{id}/edit',
      views: {
        '@': {
          template: fleetLocationDetailsTemplate,
          controller: 'FleetLocationDetailsController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: '{{::vm.location.siteId}}'
      },
      parent: 'fleet.locations.list'
    })
    .state('fleet.locations.vehicles', {
      url: '/{id}/vehicles',
      views: {
        '@': {
          template: fleetLocationVehiclesTemplate,
          controller: 'FleetVehiclesController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: 'Vehicles',
        parent: 'fleet.locations.view'
      },
      parent: 'fleet.locations.list'
    })
    .state('fleet.reports', {
      abstract: true
    })
    .state('fleet.reports.list', {
      url: '/fleet/reports',
      views: {
        '@': {
          template: fleetReportsTemplate,
          controller: 'FleetReportsController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: 'Reports'
      }
    });
}

fleetRouteConfig.$inject = ['$stateProvider'];

fleet.config(fleetRouteConfig);
