'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleDetailsModeService = function fleetLocationVehicleDetailsModeService($state) {
  var fleetLocationVehicleDetailsModeServiceInstance;

  function getNavigationStateName() {
    return $state.current.name;
  }

  function isViewMode() {
    return fleetLocationVehicleDetailsModeServiceInstance.getNavigationStateName() === 'fleet.locations.vehicles.view';
  }

  function isAddMode() {
    return fleetLocationVehicleDetailsModeServiceInstance.getNavigationStateName() === 'fleet.locations.vehicles.add';
  }

  function isEditMode() {
    return fleetLocationVehicleDetailsModeServiceInstance.getNavigationStateName() === 'fleet.locations.vehicles.edit';
  }

  fleetLocationVehicleDetailsModeServiceInstance = {
    isViewMode: isViewMode,
    isAddMode: isAddMode,
    isEditMode: isEditMode,
    getNavigationStateName: getNavigationStateName
  };
  return fleetLocationVehicleDetailsModeServiceInstance;
};

fleetLocationVehicleDetailsModeService.$inject = [
  '$state',
];

fleet
  .factory('fleetLocationVehicleDetailsModeService', fleetLocationVehicleDetailsModeService);
