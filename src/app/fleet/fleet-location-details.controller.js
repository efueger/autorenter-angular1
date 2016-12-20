'use strict';

var fleet = require('./fleet.module');

function FleetLocationDetailsController($state, fleetLocationStrategyFactory, fleetLocationDetailsModeService) {
  var vm = this;

  vm.location = {};
  vm.states = {};
  vm.selectedState = {};

  var implementationStrategy;

  vm.initialize =  function initialize() {
    implementationStrategy = fleetLocationStrategyFactory.getStrategy();
    implementationStrategy.getInitializationData($state.params.locationId)
      .then(function init(initializationData) {
        vm.location = initializationData.location;
        vm.states = initializationData.states;
        vm.selectedState = initializationData.selectedState;
      });
  };

  vm.isEditable = function isEditable() {
    return fleetLocationDetailsModeService.isAddMode() || fleetLocationDetailsModeService.isEditMode();
  };

  vm.save = function save() {
    implementationStrategy.save(vm.location);
  };

  vm.initialize();
}

FleetLocationDetailsController.$inject = [
  '$state',
  'fleetLocationStrategyFactory',
  'fleetLocationDetailsModeService'
];

fleet.controller('FleetLocationDetailsController', FleetLocationDetailsController);
