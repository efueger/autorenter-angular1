'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleEditStrategy = function fleetLocationVehicleEditStrategy($q, $state, notificationService, strings,
                                                                   vehiclesDataService, locationsDataService) {
  var fleetLocationVehicleEditStrategyInstance;

  function getInitializationData(vehicleId) {
    var deferred = $q.defer();
    var initializationData = {};
    var vehiclePromise = vehiclesDataService.getVehicle(vehicleId)
      .then(function setResult(response) {
        initializationData.vehicle = response.data;
        console.log(initializationData.vehicle);
      });
    var locationPromise = locationsDataService.getLocationByVehicleId(vehicleId)
      .then(function setResult(response) {
        initializationData.location = response.data;
        console.log(initializationData.location);
      });
    $q.all([locationPromise, vehiclePromise])
      .then(function setResult() {
        deferred.resolve(initializationData);
      });
    return deferred.promise;
  }

  fleetLocationVehicleEditStrategyInstance = {
    getInitializationData: getInitializationData
  };
  return fleetLocationVehicleEditStrategyInstance;
};

fleetLocationVehicleEditStrategy.$inject = [
  '$q',
  '$state',
  'notificationService',
  'strings',
  'vehiclesDataService',
  'locationsDataService'
];

fleet
  .factory('fleetLocationVehicleEditStrategy', fleetLocationVehicleEditStrategy);
