'use strict';

var fleet = require('./fleet.module');

function FleetLocationVehicleDetailsController($state, fleetLocationVehicleStrategyFactory, fleetLocationVehicleDetailsModeService) {
  var self = this;

  self.location;

  self.vehicle;

  var implementationStrategy;

  self.initialize =  function initialize() {
    implementationStrategy = fleetLocationVehicleStrategyFactory.getStrategy();
    implementationStrategy.getInitializationData(parseInt($state.params.vehicleId, 10))
      .then(function init(initializationData) {
        self.location = initializationData.location;
        console.log(self.location);
        self.vehicle = initializationData.vehicle;
        console.log(self.vehicle);
      });
  };

  self.isEditable = function isEditable() {
    return fleetLocationVehicleDetailsModeService.isAddMode() || fleetLocationVehicleDetailsModeService.isEditMode();
  };

  self.save = function save() {
    implementationStrategy.save(self.location);
  };

  self.initialize();
}

FleetLocationVehicleDetailsController.$inject = [
  '$state',
  'fleetLocationVehicleStrategyFactory',
  'fleetLocationVehicleDetailsModeService'
];

fleet.controller('FleetLocationVehicleDetailsController', FleetLocationVehicleDetailsController);
