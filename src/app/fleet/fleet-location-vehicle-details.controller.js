'use strict';

var fleet = require('./fleet.module');

function FleetLocationVehicleDetailsController($log,
                                               $state,
                                               fleetLocationVehicleStrategyFactory,
                                               fleetLocationVehicleDetailsModeService,
                                               fleetVehiclePropertySynchronizer) {
  var vm = this;

  vm.location = {};
  vm.vehicle = {};
  vm.makes = {};
  vm.models = {};
  vm.years = {};
  vm.colors = {};
  vm.selectedMake = {};
  vm.selectedModel = {};

  var implementationStrategy;

  vm.initialize = function initialize() {
    implementationStrategy = fleetLocationVehicleStrategyFactory.getStrategy();
    implementationStrategy.getInitializationData($state.params.locationId, $state.params.vehicleId)
      .then(function init(initializationData) {
        vm.location = initializationData.location;
        vm.vehicle = initializationData.vehicle || {};
        vm.makes = initializationData.makes;
        vm.selectedMake = initializationData.selectedMake;
        vm.selectedModel = initializationData.selectedModel;
        fleetVehiclePropertySynchronizer.initialize(initializationData);

        vm.synchLookups();
      });
  };

  vm.synchLookups = function synchLookups() {
    var synchedData = fleetVehiclePropertySynchronizer.getSynchronizedData(vm.vehicle);
    vm.models = synchedData.models;
    vm.years = synchedData.years;
    vm.colors = synchedData.colors;
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
  'fleetLocationVehicleDetailsModeService',
  'fleetVehiclePropertySynchronizer'
];

fleet.controller('FleetLocationVehicleDetailsController', FleetLocationVehicleDetailsController);
