'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleAddStrategy = function fleetLocationVehicleAddStrategy($state,
                                                                               notificationService,
                                                                               strings,
                                                                               fleetLocationVehicleInitializationFactory,
                                                                               vehiclesDataService) {
  var fleetLocationVehicleAddStrategyInstance;

  function getInitializationData(locationId) {
    return fleetLocationVehicleInitializationFactory.getInitializationData(locationId);
  }

  function notifySuccess(vin) {
    var message = strings.format('Vehicle \'{vin}\' was added successfully.', { vin: vin });
    notificationService.notifySuccess({
      userMessage: message
    });
  }

  function save(locationId, vehicle) {
    vehiclesDataService.addVehicleToLocation(locationId, vehicle)
      .then(function notifyAndNavigate() {
        fleetLocationVehicleAddStrategyInstance.notifySuccess(vehicle.vin);
        $state.go('fleet.locations.vehicles');
      });
  }

  fleetLocationVehicleAddStrategyInstance = {
    getInitializationData: getInitializationData,
    save: save,
    notifySuccess: notifySuccess
  };
  return fleetLocationVehicleAddStrategyInstance;
};

fleetLocationVehicleAddStrategy.$inject = [
  '$state',
  'notificationService',
  'strings',
  'fleetLocationVehicleInitializationFactory',
  'vehiclesDataService'
];

fleet
  .factory('fleetLocationVehicleAddStrategy', fleetLocationVehicleAddStrategy);
