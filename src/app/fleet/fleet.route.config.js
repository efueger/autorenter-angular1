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
    .state('fleet.locations.add', {
      url: '/add',
      views: {
        '@': {
          templateUrl: 'app/fleet-location-details.html',
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
          templateUrl: 'app/fleet-location-details.html',
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
          templateUrl: 'app/fleet-location-details.html',
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
          templateUrl: 'app/fleet-location-vehicles.html',
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
    .state('fleet.locations.vehicles.view', {
      url: '/{id}/view',
      views: {
        '@': {
          templateUrl: 'app/fleet-location-vehicle-details.html',
          controller: 'FleetLocationVehicleDetailsController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: '{{::vm.vehicle.vin}}'
      },
      parent: 'fleet.locations.vehicles'
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

fleetRouteConfig.$inject = ['$stateProvider'];

fleet.config(fleetRouteConfig);
