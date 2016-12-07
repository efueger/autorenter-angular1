'use strict';

var fleet = require('./fleet.module');

function FleetVehiclesController($q, $state, vehiclesDataService, confirmationService, strings) {
  var self = this;

  self.gridOptions;

  self.vehicles;

  self.location;

  self.deleteVehicle = function deleteVehicle(vehicle) {
    confirmationService.show(strings.format('Delete vehicle \'{vin}\'?', { vin: vehicle.vin }))
      .then(function deleteIt() {
        vehiclesDataService.deleteVehicle(vehicle.id)
          .then(function repopulateGrid() {
            self.populateGrid();
          });
      });
  };

  self.initialize = function initialize() {
    self.configureGrid();
    self.initializeLocation($state.params.id);
  };

  self.initializeLocation = function initializeLocation(locationId) { // eslint-disable-line no-unused-vars
    // TODO: init the location field using the DS.
  };

  self.configureGrid = function configureGrid() {
    self.gridOptions = {
      flatEntityAccess: true,
      enableColumnResizing: true,
      enableColumnMenus: false,
      columnDefs: self.getColumnDefs(),
      onRegisterApi: self.onRegisterGridApi.bind(self)
    };
  };

  self.getColumnDefs = function getColumnDefs() {
    var currentPath = 'app/';
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
        cellTemplate: currentPath + 'fleet-location-vehicles-id-column.html'
      },
      {
        displayName: 'Make',
        field: 'make',
        type: 'string',
        enableSorting: false,
      },
      {
        displayName: 'Model',
        field: 'model',
        type: 'string',
        enableSorting: false,
      },
      {
        displayName: 'Year',
        field: 'year',
        type: 'number',
        enableSorting: false,
      },
      {
        displayName: 'Miles',
        field: 'miles',
        type: 'number',
        enableSorting: false,
      },
      {
        displayName: 'Color',
        field: 'color',
        type: 'string',
        enableSorting: false,
      },
      {
        displayName: 'Rent to Own',
        field: 'isRentToOwn',
        type: 'boolean',
        enableSorting: false,
        cellTemplate: currentPath + 'fleet-location-vehicles-rent-to-own-column.html'
      },
      {
        displayName: 'Actions',
        width: 200,
        field: 'id',
        enableSorting: false,
        cellTemplate: currentPath + 'fleet-location-vehicles-actions-column.html'
      }
    ];
  };

  self.onRegisterGridApi = function onRegisterGridApi() {
    self.populateGrid();
  };

  self.populateGrid = function populateGrid() {
    vehiclesDataService.getVehicles($state.params.id)
      .then(function assignData(response) {
        self.gridOptions.data = response.data;
      });
  };

  self.initialize();
}

FleetVehiclesController.$inject = [
  '$q',
  '$state',
  'vehiclesDataService',
  'confirmationService',
  'strings'
];

fleet.controller('FleetVehiclesController', FleetVehiclesController);
