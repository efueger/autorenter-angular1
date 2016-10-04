'use strict';

var fleet = require('./fleet.module');

var fleetLocationDetailsModeService = function fleetLocationDetailsModeService($state) {
  function getNavigationStateName() {
    return $state.current.name;
  }

  function isAddMode() {
    return getNavigationStateName() === 'fleet.locations.add';
  }

  function isEditMode() {
    return getNavigationStateName() === 'fleet.locations.edit';
  }

  function isViewMode() {
    return getNavigationStateName() === 'fleet.locations.view';
  }

  return {
    isAddMode: isAddMode,
    isEditMode: isEditMode,
    isViewMode: isViewMode,
    getNavigationStateName: getNavigationStateName
  };
};

fleetLocationDetailsModeService.$inject = [
  '$state',
];

fleet
  .factory('fleetLocationDetailsModeService', fleetLocationDetailsModeService);
