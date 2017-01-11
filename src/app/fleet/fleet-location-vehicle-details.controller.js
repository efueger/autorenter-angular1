'use strict';

var fleet = require('./fleet.module');

function FleetLocationVehicleDetailsController($log, $state, fleetLocationVehicleStrategyFactory, fleetLocationVehicleDetailsModeService) {
  var vm = this;

  vm.location = {};
  vm.vehicle = {};
  vm.years = {};
  vm.colors = {};

  var implementationStrategy;

  vm.initialize = function initialize() {
    implementationStrategy = fleetLocationVehicleStrategyFactory.getStrategy();
    implementationStrategy.getInitializationData($state.params.locationId, $state.params.vehicleId)
      .then(function init(initializationData) {
        vm.location = initializationData.location;
        vm.vehicle = initializationData.vehicle;
        vm.colors = initializationData.colors;
        vm.years = initializationData.years;
        vm.makes = initializationData.makes;
        vm.models = initializationData.models;
      });
  };

  vm.synchLookups = function synchLookups(propertyName) {
    $log.info('Property changed: ' + propertyName);
  };

  vm.isEditable = function isEditable() {
    return fleetLocationVehicleDetailsModeService.isAddMode() || fleetLocationVehicleDetailsModeService.isEditMode();
  };

  vm.save = function save() {
    implementationStrategy.save(vm.location.id, vm.vehicle);
  };

  vm.initialize();
}

FleetLocationVehicleDetailsController.$inject = [
  '$log',
  '$state',
  'fleetLocationVehicleStrategyFactory',
  'fleetLocationVehicleDetailsModeService'
];

fleet.controller('FleetLocationVehicleDetailsController', FleetLocationVehicleDetailsController);
