'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleEditStrategy = function fleetLocationVehicleEditStrategy($q, $state, notificationService, strings,
                                                                   vehiclesDataService, locationsDataService) {
  var fleetLocationVehicleEditStrategyInstance;

  var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
  function getYears() {
    var deferred = $q.defer();
    deferred.resolve({data: years});
    return deferred.promise;
  }

  function getInitializationData(vehicleId) {
    var deferred = $q.defer();
    var initializationData = {};

    var vehiclePromise = vehiclesDataService.getVehicle(vehicleId)
      .then(function setResult(response) {
        initializationData.vehicle = response.data;
      });
    var locationPromise = locationsDataService.getLocationByVehicleId(vehicleId)
      .then(function setResult(response) {
        initializationData.location = response.data;
      });
    var yearsPromise = getYears()
      .then(function setResult(response) {
        initializationData.years = response.data;
      });

    $q.all([locationPromise, vehiclePromise, yearsPromise])
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
