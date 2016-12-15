'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleAddStrategy = function fleetLocationVehicleAddStrategy($q, $state, notificationService, strings,
                                                                 locationsDataService, vehiclesDataService) {
  var fleetLocationVehicleAddStrategyInstance;
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

  function getInitializationData(locationId) {
    var deferred = $q.defer();
    var initializationData = {};

    var locationPromise = locationsDataService.getLocation(locationId)
      .then(function setResult(response) {
        initializationData.location = response.data;
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
    $q.all([locationPromise, yearsPromise, colorsPromise, makesPromise, modelsPromise])
      .then(function setResult() {
        deferred.resolve(initializationData);
      });
    return deferred.promise;
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
  '$q',
  '$state',
  'notificationService',
  'strings',
  'locationsDataService',
  'vehiclesDataService'
];

fleet
  .factory('fleetLocationVehicleAddStrategy', fleetLocationVehicleAddStrategy);
  