'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleInitialization = function fleetLocationVehicleInitialization($q,

                                                                   locationsDataService, vehiclesDataService) {
  var fleetLocationVehicleInitializationInstance;

  var colors = ['Black', 'Blue', 'Gold', 'Orange', 'Red', 'Silver'];
  var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
  var models = [ 'Civic', 'Impala', 'Pinto', 'Tercel'];
  var makes = ['Chevrolet', 'Ford', 'Honda', 'Toyota'];

  function getYears() {
    var deferred = $q.defer();
    deferred.resolve({data: years});
    return deferred.promise;
  }

  function getColors() {
    var deferred = $q.defer();
    deferred.resolve({data: colors});
    return deferred.promise;
  }

  function getMakes() {
    var deferred = $q.defer();
    deferred.resolve({data: makes});
    return deferred.promise;
  }

  function getModels() {
    var deferred = $q.defer();
    deferred.resolve({data: models});
    return deferred.promise;
  }

  function getInitializationData(locationId, vehicleId) {
    var deferred = $q.defer();
    var initializationData = {};

    var vehiclePromise = vehiclesDataService.getVehicle(vehicleId)
      .then(function setResult(response) {
        initializationData.vehicle = response.data.vehicle;
      });
    var locationPromise = locationsDataService.getLocation(locationId)
      .then(function setResult(response) {
        initializationData.location = response.data.location;
      });
    var yearsPromise = getYears()
      .then(function setResult(response) {
        initializationData.years = response.data;
      });
    var colorsPromise = getColors()
      .then(function setResult(response) {
        initializationData.colors = response.data;
      });
    var makesPromise = getMakes()
      .then(function setResult(response) {
        initializationData.makes = response.data;
      });
    var modelsPromise = getModels()
      .then(function setResult(response) {
        initializationData.models = response.data;
      });
    $q.all([locationPromise, vehiclePromise, yearsPromise, colorsPromise, makesPromise, modelsPromise])
      .then(function setResult() {
        deferred.resolve(initializationData);
      });
    return deferred.promise;
  }

  fleetLocationVehicleInitializationInstance = {
    getInitializationData: getInitializationData
  };
  return fleetLocationVehicleInitializationInstance;
};

fleetLocationVehicleInitialization.$inject = [
  '$q',
  'locationsDataService',
  'vehiclesDataService'
];

fleet
  .factory('fleetLocationVehicleInitialization', fleetLocationVehicleInitialization);
