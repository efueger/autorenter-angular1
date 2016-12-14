'use strict';

var fleet = require('./fleet.module');

function FleetLocationVehicleDetailsController($state, fleetLocationVehicleStrategyFactory, fleetLocationVehicleDetailsModeService) {
  var self = this;

  self.location = {};

  self.vehicle = {};

  self.years = {};

  self.colors = {};

  var implementationStrategy;

  self.initialize =  function initialize() {
    implementationStrategy = fleetLocationVehicleStrategyFactory.getStrategy();
    implementationStrategy.getInitializationData($state.params.locationId, parseInt($state.params.vehicleId, 10))
      .then(function init(initializationData) {
        self.location = initializationData.location;
        self.vehicle = initializationData.vehicle;
        self.colors = initializationData.colors;
        self.years = initializationData.years;
        self.makes = initializationData.makes;
        self.models = initializationData.models;
      });
  };

  self.isEditable = function isEditable() {
    return fleetLocationVehicleDetailsModeService.isAddMode() || fleetLocationVehicleDetailsModeService.isEditMode();
  };

  self.save = function save() {
    implementationStrategy.save(self.vehicle);
  };

  self.initialize();
}

FleetLocationVehicleDetailsController.$inject = [
  '$state',
  'fleetLocationVehicleStrategyFactory',
  'fleetLocationVehicleDetailsModeService'
];

fleet.controller('FleetLocationVehicleDetailsController', FleetLocationVehicleDetailsController);
