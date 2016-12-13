'use strict';

var fleet = require('./fleet.module');
var fleetLocationVehiclesIdColumnTemplate = require('./fleet-location-vehicles-id-column.html');
var fleetLocationVehiclesRentToOwnColumnTemplate = require('./fleet-location-vehicles-rent-to-own-column.html');
var fleetLocationVehiclesActionsColumnTemplate = require('./fleet-location-vehicles-actions-column.html');

function FleetVehiclesController(generalConfig,
                                 $state,
                                 vehiclesDataService,
                                 locationsDataService,
                                 confirmationService,
                                 strings) {
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
    self.initializeLocation($state.params.locationId);
  };

  self.initializeLocation = function initializeLocation(locationId) {
    locationsDataService.getLocation(locationId)
      .then(function setLocation(response) {
        self.location = response.data;
      });
  };

  self.configureGrid = function configureGrid() {
    self.gridOptions = {
      flatEntityAccess: true,
      enableColumnResizing: true,
      enableColumnMenus: false,
      columnDefs: self.getColumnDefs(),
      onRegisterApi: self.onRegisterGridApi.bind(self),
      appScopeProvider: self
    };
  };

  self.getColumnDefs = function getColumnDefs() {
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

  self.onRegisterGridApi = function onRegisterGridApi() {
    self.populateGrid();
  };

  self.populateGrid = function populateGrid() {
    vehiclesDataService.getVehicles($state.params.locationId)
      .then(function assignData(response) {
        self.gridOptions.data = response.data;
      });
  };

  self.initialize();
}

FleetVehiclesController.$inject = [
  'generalConfig',
  '$state',
  'vehiclesDataService',
  'locationsDataService',
  'confirmationService',
  'strings'
];

fleet.controller('FleetVehiclesController', FleetVehiclesController);
