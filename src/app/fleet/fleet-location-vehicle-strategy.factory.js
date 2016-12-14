'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleStrategyFactory = function fleetLocationVehicleStrategyFactory(strings, fleetLocationVehicleDetailsModeService,
                                                                         fleetLocationVehicleViewStrategy, fleetLocationVehicleEditStrategy,
                                                                         fleetLocationVehicleAddStrategy) {
  function getStrategy() {
    var strategy;
    if (fleetLocationVehicleDetailsModeService.isViewMode()) {
      strategy = fleetLocationVehicleViewStrategy;
    } else if (fleetLocationVehicleDetailsModeService.isEditMode()) {
      strategy = fleetLocationVehicleEditStrategy;
    } else if (fleetLocationVehicleDetailsModeService.isAddMode()) {
      strategy = fleetLocationVehicleAddStrategy;
    } else {
      var errorMessage = strings.format('Unsupported mode for navigation state \'{navState}\'.',
        {navState: fleetLocationVehicleDetailsModeService.getNavigationStateName()});
      throw new Error(errorMessage);
    }
    return strategy;
  }

  return {
    getStrategy: getStrategy
  };
};

fleetLocationVehicleStrategyFactory.$inject = [
  'strings',
  'fleetLocationVehicleDetailsModeService',
  'fleetLocationVehicleViewStrategy',
  'fleetLocationVehicleEditStrategy',
  'fleetLocationVehicleAddStrategy'
];

fleet
  .factory('fleetLocationVehicleStrategyFactory', fleetLocationVehicleStrategyFactory);
