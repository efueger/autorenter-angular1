'use strict';

var fleet = require('./fleet.module');

function FleetLocationsController(locationsDataService) {
  var self = this;

  self.gridOptions;

  function getColumnDefs() {
    var currentPath = 'app/';
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
        field: 'state',
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
  }

  function populateGrid() {
    locationsDataService.getLocations()
      .then(function assignData(response) {
        self.gridOptions.data = response.data;
      });
  }

  function onRegisterGridApi() {
    populateGrid();
  }

  function configureGrid() {
    self.gridOptions = {
      flatEntityAccess: true,
      enableColumnMenus: false,
      columnDefs: getColumnDefs(),
      onRegisterApi: onRegisterGridApi.bind(self)
    };
  }

  function initialize() {
    configureGrid();
  }

  initialize();

  self.deleteLocation = function deleteLocation(location) {
    // TODO - confirm delete
    locationsDataService.deleteLocation(location.id)
      .then(function repopulateGrid() {
        populateGrid();
      });
  };
}

FleetLocationsController.$inject = ['locationsDataService'];

fleet.controller('FleetLocationsController', FleetLocationsController);
