'use strict';

var fleet = require('./fleet.module');
var fleetHeaderTemplate = require('./templates/fleet.header.html');
var fleetLocationsTemplate = require('./templates/fleet-locations.html');
var fleetLocationDetailsTemplate = require('./templates/fleet-location-details.html');
var fleetLocationVehiclesTemplate = require('./templates/fleet-location-vehicles.html');
var fleetLocationVehicleDetailsTemplate = require('./templates/fleet-location-vehicle-details.html');
var fleetReportsTemplate = require('./templates/fleet-reports.html');

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
      url: '/{locationId}/view',
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
      url: '/{locationId}/edit',
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
      url: '/{locationId}/vehicles',
      views: {
        '@': {
          template: fleetLocationVehiclesTemplate,
          controller: 'FleetLocationVehiclesController',
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
      url: '/{vehicleId}/view',
      views: {
        '@': {
          template: fleetLocationVehicleDetailsTemplate,
          controller: 'FleetLocationVehicleDetailsController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: '{{::vm.vehicle.vin}}'
      },
      parent: 'fleet.locations.vehicles'
    })
    .state('fleet.locations.vehicles.edit', {
      url: '/{vehicleId}/edit',
      views: {
        '@': {
          template: fleetLocationVehicleDetailsTemplate,
          controller: 'FleetLocationVehicleDetailsController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: '{{::vm.vehicle.vin}}'
      },
      parent: 'fleet.locations.vehicles'
    })
    .state('fleet.locations.vehicles.add', {
      url: '/add',
      views: {
        '@': {
          template: fleetLocationVehicleDetailsTemplate,
          controller: 'FleetLocationVehicleDetailsController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: 'Add'
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
