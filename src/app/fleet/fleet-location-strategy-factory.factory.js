'use strict';

var fleet = require('./fleet.module');

var fleetLocationStrategyFactory = function fleetLocationStrategyFactory(strings, fleetLocationDetailsModeService,
                                                                         fleetLocationAddStrategy, fleetLocationEditStrategy,
                                                                         fleetLocationViewStrategy) {
  function getStrategy() {
    var strategy;
    if (fleetLocationDetailsModeService.isAddMode()) {
      strategy = fleetLocationAddStrategy;
    } else if (fleetLocationDetailsModeService.isEditMode()) {
      strategy = fleetLocationEditStrategy;
    } else if (fleetLocationDetailsModeService.isViewMode()) {
      strategy = fleetLocationViewStrategy;
    } else {
      var errorMessage = strings.format('Unsupported mode for navigation state \'{navState}\'.',
        {navState: fleetLocationDetailsModeService.getNavigationStateName()});
      throw new Error(errorMessage);
    }

    return strategy;
  }

  return {
    getStrategy: getStrategy
  };
};

fleetLocationStrategyFactory.$inject = [
  'strings',
  'fleetLocationDetailsModeService',
  'fleetLocationAddStrategy',
  'fleetLocationEditStrategy',
  'fleetLocationViewStrategy'
];

fleet
  .factory('fleetLocationStrategyFactory', fleetLocationStrategyFactory);
