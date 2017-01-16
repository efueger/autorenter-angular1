'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleViewStrategy =
  function fleetLocationVehicleViewStrategy(fleetLocationVehicleInitializationFactory) {
    var getInitializationData = function getInitializationData(locationId, vehicleId) {
      return fleetLocationVehicleInitializationFactory.getInitializationData(locationId, vehicleId);
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
