'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleViewStrategy = function fleetLocationVehicleViewStrategy(fleetLocationEditStrategy) {
  var getInitializationData = function getInitializationData(locationId, vehicleId) {
    return fleetLocationEditStrategy.getInitializationData(locationId, vehicleId)
      .then(function setResult(initializationData) {
        return initializationData;
      });
  };

  return {
    getInitializationData: getInitializationData,
    save: function nullOp() { }
  };
};

fleetLocationVehicleViewStrategy.$inject = [
  'fleetLocationVehicleEditStrategy'
];

fleet
  .factory('fleetLocationVehicleViewStrategy', fleetLocationVehicleViewStrategy);