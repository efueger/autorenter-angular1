'use strict';

var fleet = require('./fleet.module');
var fleetLocationIdColumnTemplate = require('./templates/fleet-locations-id-column.html');
var fleetLocationsActionsColumnTemplate = require('./templates/fleet-locations-actions-column.html');

function FleetLocationsController(generalConfig, locationsDataService, confirmationService, strings) {
  var vm = this;

  vm.gridOptions = {};

  vm.deleteLocation = function deleteLocation(location) {
    confirmationService.show(strings.format('Delete location \'{siteId}\'?', {siteId: location.siteId}))
      .then(function deleteIt() {
        locationsDataService.deleteLocation(location.id)
          .then(function repopulateGrid() {
            vm.populateGrid();
          });
      });
  };

  vm.initialize = function initialize() {
    vm.configureGrid();
  };

  vm.configureGrid = function configureGrid() {
    vm.gridOptions = {
      flatEntityAccess: true,
      enableColumnResizing: true,
      enableColumnMenus: false,
      columnDefs: vm.getColumnDefs(),
      onRegisterApi: vm.onRegisterGridApi.bind(vm)
    };
  };

  vm.getColumnDefs = function getColumnDefs() {
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
        cellTemplate: fleetLocationIdColumnTemplate
      },
      {
        displayName: 'Name',
        field: 'name',
        type: 'string',
        enableSorting: false
      },
      {
        displayName: 'Vehicles',
        field: 'vehicleCount',
        type: 'number',
        enableSorting: false
      },
      {
        displayName: 'City',
        field: 'city',
        type: 'string',
        enableSorting: false
      },
      {
        displayName: 'State',
        field: 'stateCode',
        type: 'string',
        enableSorting: false
      },
      {
        displayName: 'Actions',
        width: 200,
        field: 'id',
        enableSorting: false,
        cellTemplate: fleetLocationsActionsColumnTemplate
      }
    ];
  };

  vm.onRegisterGridApi = function onRegisterGridApi() {
    vm.populateGrid();
  };

  vm.populateGrid = function populateGrid() {
    locationsDataService.getLocations()
      .then(function assignData(response) {
        vm.gridOptions.data = response.data.locations;
      });
  };

  vm.initialize();
}

FleetLocationsController.$inject = [
  'generalConfig',
  'locationsDataService',
  'confirmationService',
  'strings'
];

fleet.controller('FleetLocationsController', FleetLocationsController);
