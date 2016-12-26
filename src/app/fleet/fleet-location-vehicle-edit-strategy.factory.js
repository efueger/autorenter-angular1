'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleEditStrategy = function fleetLocationVehicleEditStrategy($q, $state, notificationService, strings,
                                                                   vehiclesDataService, locationsDataService,
                                                                   fleetLocationVehicleInitialization) {
  var fleetLocationVehicleEditStrategyInstance;

  var getInitializationData = function getInitializationData(locationId, vehicleId) {
    return fleetLocationVehicleInitialization.getInitializationData(locationId, vehicleId)
      .then(function setResult(initializationData) {
        return initializationData;
      });
  };

  function notifySuccess(vin) {
    var message = strings.format('Vehicle \'{vin}\' was updated successfully.', { vin: vin });
    notificationService.notifySuccess({
      userMessage: message
    });
  }

  function save(locationId, vehicle) {
    vehiclesDataService.updateVehicle(vehicle)
      .then(function notifyAndNavigate() {
        fleetLocationVehicleEditStrategyInstance.notifySuccess(vehicle.vin);
        $state.go('fleet.locations.vehicles');
      });
  }

  fleetLocationVehicleEditStrategyInstance = {
    getInitializationData: getInitializationData,
    save: save,
    notifySuccess: notifySuccess
  };
  return fleetLocationVehicleEditStrategyInstance;
};

fleetLocationVehicleEditStrategy.$inject = [
  '$q',
  '$state',
  'notificationService',
  'strings',
  'vehiclesDataService',
  'locationsDataService',
  'fleetLocationVehicleInitialization'
];

fleet
  .factory('fleetLocationVehicleEditStrategy', fleetLocationVehicleEditStrategy);
