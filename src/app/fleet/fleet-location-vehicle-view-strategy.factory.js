'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleViewStrategy =
  function fleetLocationVehicleViewStrategy(fleetLocationVehicleInitializationFactory) {
    var getInitializationData = function getInitializationData(locationId, vehicleId) {
      return fleetLocationVehicleInitializationFactory.getInitializationData(locationId, vehicleId)
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
  'fleetLocationVehicleInitializationFactory'
];

fleet
  .factory('fleetLocationVehicleViewStrategy', fleetLocationVehicleViewStrategy);
