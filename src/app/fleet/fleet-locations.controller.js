'use strict';

var fleet = require('./fleet.module');

function FleetLocationsController(generalConfig, locationsDataService, confirmationService, strings) {
  var self = this;

  self.gridOptions;

  self.deleteLocation = function deleteLocation(location) {
    confirmationService.show(strings.format('Delete location \'{siteId}\'?', {siteId: location.siteId}))
      .then(function deleteIt() {
        locationsDataService.deleteLocation(location.id)
          .then(function repopulateGrid() {
            self.populateGrid();
          });
      });
  };

  self.initialize = function initialize() {
    self.configureGrid();
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
    var currentPath = generalConfig.sourcePathRoot;
    return [
      {
        displayName: 'Site ID',
        field: 'siteId',
        type: 'string',
        enableSorting: true,
        suppressRemoveSort: true,
        sort: {
          priority: 0,
          direction: 'asc'
        },
        cellTemplate: currentPath + 'fleet-locations-id-column.html'
      },
      {
        displayName: 'Name',
        field: 'name',
        type: 'string',
        enableSorting: false,
      },
      {
        displayName: 'Vehicles',
        field: 'vehicleCount',
        type: 'number',
        enableSorting: false,
      },
      {
        displayName: 'City',
        field: 'city',
        type: 'string',
        enableSorting: false,
      },
      {
        displayName: 'State',
        field: 'stateCode',
        type: 'string',
        enableSorting: false,
      },
      {
        displayName: 'Actions',
        width: 200,
        field: 'id',
        enableSorting: false,
        cellTemplate: currentPath + 'fleet-locations-actions-column.html'
      }
    ];
  };

  self.onRegisterGridApi = function onRegisterGridApi() {
    self.populateGrid();
  };

  self.populateGrid = function populateGrid() {
    locationsDataService.getLocations()
      .then(function assignData(response) {
        self.gridOptions.data = response.data;
      });
  };

  self.initialize();
}

FleetLocationsController.$inject = [
  'generalConfig',
  'locationsDataService',
  'confirmationService',
  'strings'
];

fleet.controller('FleetLocationsController', FleetLocationsController);
