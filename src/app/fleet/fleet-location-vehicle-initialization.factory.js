'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleInitialization = function fleetLocationVehicleInitialization($q,
                                                                                     lookupDataService,
                                                                                     locationsDataService,
                                                                                     vehiclesDataService) {
  var fleetLocationVehicleInitializationInstance;
  var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];

  function getYears() {
    var deferred = $q.defer();
    deferred.resolve({data: years});
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
    $q.all([locationPromise, vehiclePromise, yearsPromise, vehicleLookupDataPromise])
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
  'lookupDataService',
  'locationsDataService',
  'vehiclesDataService'
];

fleet
  .factory('fleetLocationVehicleInitialization', fleetLocationVehicleInitialization);
