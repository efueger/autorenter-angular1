'use strict';

var fleet = require('./fleet.module');

var fleetLocationDetailsModeService = function fleetLocationDetailsModeService($state) {
  var fleetLocationDetailsModeServiceInstance;

  function getNavigationStateName() {
    return $state.current.name;
  }

  function isAddMode() {
    return fleetLocationDetailsModeServiceInstance.getNavigationStateName() === 'fleet.locations.add';
  }

  function isEditMode() {
    return fleetLocationDetailsModeServiceInstance.getNavigationStateName() === 'fleet.locations.edit';
  }

  function isViewMode() {
    return fleetLocationDetailsModeServiceInstance.getNavigationStateName() === 'fleet.locations.view';
  }

  fleetLocationDetailsModeServiceInstance = {
    isAddMode: isAddMode,
    isEditMode: isEditMode,
    isViewMode: isViewMode,
    getNavigationStateName: getNavigationStateName
  };
  return fleetLocationDetailsModeServiceInstance;
};

fleetLocationDetailsModeService.$inject = [
  '$state'
];

fleet
  .factory('fleetLocationDetailsModeService', fleetLocationDetailsModeService);
