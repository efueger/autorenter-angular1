'use strict';

var fleet = require('./fleet.module');

function FleetLocationDetailsController($state, fleetLocationStrategyFactory, fleetLocationDetailsModeService) {
  var self = this;

  self.location = {};
  self.states = {};
  self.selectedState = {};

  var implementationStrategy;

  self.initialize =  function initialize() {
    implementationStrategy = fleetLocationStrategyFactory.getStrategy();
    implementationStrategy.getInitializationData($state.params.locationId)
      .then(function init(initializationData) {
        self.location = initializationData.location;
        self.states = initializationData.states;
        self.selectedState = initializationData.selectedState;
      });
  };

  self.isEditable = function isEditable() {
    return fleetLocationDetailsModeService.isAddMode() || fleetLocationDetailsModeService.isEditMode();
  };

  self.save = function save() {
    implementationStrategy.save(self.location);
  };

  self.initialize();
}

FleetLocationDetailsController.$inject = [
  '$state',
  'fleetLocationStrategyFactory',
  'fleetLocationDetailsModeService'
];

fleet.controller('FleetLocationDetailsController', FleetLocationDetailsController);
