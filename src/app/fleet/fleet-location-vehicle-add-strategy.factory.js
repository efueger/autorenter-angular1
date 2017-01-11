'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleAddStrategy = function fleetLocationVehicleAddStrategy($q,
                                                                               $state,
                                                                               notificationService,
                                                                               strings,
                                                                               lookupDataService,
                                                                               locationsDataService,
                                                                               vehiclesDataService) {
  var fleetLocationVehicleAddStrategyInstance;
  var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];

  function getYears() {
    var deferred = $q.defer();
    deferred.resolve({data: years});
    return deferred.promise;
  }

  function getInitializationData(locationId) {
    var deferred = $q.defer();
    var initializationData = {};

    var locationPromise = locationsDataService.getLocation(locationId)
      .then(function setResult(response) {
        initializationData.location = response.data.location;
      });
    var yearsPromise = getYears()
      .then(function setResult(response) {
        initializationData.years = response.data;
      });
    var vehicleLookupDataPromise = lookupDataService.getVehicleLookupData()
      .then(function setResult(response) {
        initializationData.makes = response.data.lookupData.makes.map(function (make) {
          return make.name;
        });
        initializationData.models = response.data.lookupData.models.map(function (model) {
          return model.name;
        });
        initializationData.colors = response.data.lookupData.colors;
      });
    $q.all([locationPromise, yearsPromise, vehicleLookupDataPromise])
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
  'lookupDataService',
  'locationsDataService',
  'vehiclesDataService'
];

fleet
  .factory('fleetLocationVehicleAddStrategy', fleetLocationVehicleAddStrategy);
