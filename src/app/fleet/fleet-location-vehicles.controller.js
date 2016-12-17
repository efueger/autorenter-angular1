'use strict';

var fleet = require('./fleet.module');
var fleetLocationVehiclesIdColumnTemplate = require('./fleet-location-vehicles-id-column.html');
var fleetLocationVehiclesRentToOwnColumnTemplate = require('./fleet-location-vehicles-rent-to-own-column.html');
var fleetLocationVehiclesActionsColumnTemplate = require('./fleet-location-vehicles-actions-column.html');

function FleetLocationVehiclesController($state,
                                 vehiclesDataService,
                                 locationsDataService,
                                 confirmationService,
                                 strings) {
  var vm = this;

  vm.gridOptions = {};
  vm.vehicles = {};
  vm.location = {};

  vm.deleteVehicle = function deleteVehicle(vehicle) {
    confirmationService.show(strings.format('Delete vehicle \'{vin}\'?', { vin: vehicle.vin }))
      .then(function deleteIt() {
        vehiclesDataService.deleteVehicle(vehicle.id)
          .then(function repopulateGrid() {
            vm.populateGrid();
          });
      });
  };

  vm.initialize = function initialize() {
    vm.configureGrid();
    vm.initializeLocation($state.params.locationId);
  };

  vm.initializeLocation = function initializeLocation(locationId) {
    locationsDataService.getLocation(locationId)
      .then(function setLocation(response) {
        vm.location = response.data.location;
      });
  };

  vm.configureGrid = function configureGrid() {
    vm.gridOptions = {
      flatEntityAccess: true,
      enableColumnResizing: true,
      enableColumnMenus: false,
      columnDefs: vm.getColumnDefs(),
      onRegisterApi: vm.onRegisterGridApi.bind(vm),
      appScopeProvider: vm
    };
  };

  vm.getColumnDefs = function getColumnDefs() {
    return [
      {
        displayName: 'VIN',
        field: 'vin',
        type: 'string',
        enableSorting: true,
        suppressRemoveSort: true,
        sort: {
          priority: 0,
          direction: 'asc'
        },
        cellTemplate: fleetLocationVehiclesIdColumnTemplate
      },
      {
        displayName: 'Make',
        field: 'make',
        type: 'string',
        enableSorting: false
      },
      {
        displayName: 'Model',
        field: 'model',
        type: 'string',
        enableSorting: false
      },
      {
        displayName: 'Year',
        field: 'year',
        type: 'number',
        enableSorting: false
      },
      {
        displayName: 'Miles',
        field: 'miles',
        type: 'number',
        enableSorting: false
      },
      {
        displayName: 'Color',
        field: 'color',
        type: 'string',
        enableSorting: false
      },
      {
        displayName: 'Rent to Own',
        field: 'isRentToOwn',
        type: 'boolean',
        enableSorting: false,
        cellTemplate: fleetLocationVehiclesRentToOwnColumnTemplate
      },
      {
        displayName: 'Actions',
        width: 200,
        field: 'id',
        enableSorting: false,
        cellTemplate: fleetLocationVehiclesActionsColumnTemplate
      }
    ];
  };

  vm.onRegisterGridApi = function onRegisterGridApi() {
    vm.populateGrid();
  };

  vm.populateGrid = function populateGrid() {
    vehiclesDataService.getVehicles($state.params.locationId)
      .then(function assignData(response) {
        vm.gridOptions.data = response.data.vehicles;
      });
  };

  vm.initialize();
}

FleetLocationVehiclesController.$inject = [
  '$state',
  'vehiclesDataService',
  'locationsDataService',
  'confirmationService',
  'strings'
];

fleet.controller('FleetLocationVehiclesController', FleetLocationVehiclesController);
