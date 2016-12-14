'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleEditStrategy = function fleetLocationVehicleEditStrategy($q, $state, notificationService, strings,
                                                                   vehiclesDataService, locationsDataService) {
  var fleetLocationVehicleEditStrategyInstance;

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
        initializationData.vehicle = response.data;
      });
    var locationPromise = locationsDataService.getLocation(locationId)
      .then(function setResult(response) {
        initializationData.location = response.data.data;
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

  function notifySuccess(vin) {
    var message = strings.format('Vehicle \'{vin}\' was updated successfully.', { vin: vin });
    notificationService.notifySuccess({
      userMessage: message
    });
  }

  function save(vehicle) {
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
  'locationsDataService'
];

fleet
  .factory('fleetLocationVehicleEditStrategy', fleetLocationVehicleEditStrategy);
