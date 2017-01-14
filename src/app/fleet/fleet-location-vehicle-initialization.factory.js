'use strict';

var fleet = require('./fleet.module');

var fleetLocationVehicleInitializationFactory = function fleetLocationVehicleInitializationFactoryFactory($q,
                                                                                     lookupDataService,
                                                                                     skuDataService,
                                                                                     locationsDataService,
                                                                                     vehiclesDataService) {
  var fleetLocationVehicleInitializationFactoryInstance;

  function getInitializationData(locationId, vehicleId) {
    var deferred = $q.defer();
    var initializationData = {};
    var promises = [];

    if (vehicleId) {
      var vehiclePromise = vehiclesDataService.getVehicle(vehicleId)
        .then(function setResult(response) {
          initializationData.vehicle = response.data.vehicle;
        });
      promises.push(vehiclePromise);
    }

    var locationPromise = locationsDataService.getLocation(locationId)
      .then(function setResult(response) {
        initializationData.location = response.data.location;
      });
    promises.push(locationPromise);

    var skuPromise = skuDataService.getSkus()
      .then(function setResult(response) {
        initializationData.skus = response.data.skus;
      });
    promises.push(skuPromise);

    var vehicleLookupDataPromise = lookupDataService.getVehicleLookupData()
      .then(function setResult(response) {
        initializationData.makes = response.data.lookupData.makes;
        initializationData.models = response.data.lookupData.models;
      });
    promises.push(vehicleLookupDataPromise);

    $q.all(promises)
      .then(function setResult() {
        setSelectedVehicleData(initializationData);
        deferred.resolve(initializationData);
      });
    return deferred.promise;
  }

  function setSelectedVehicleData(initializationData) {
    if (initializationData.vehicle) {
      initializationData.models.forEach(function setModel(modelElement) {
        if (modelElement.id === initializationData.vehicle.modelId) {
          initializationData.selectedModel = modelElement;
        }
      });
      initializationData.makes.forEach(function setMake(makeElement) {
        if (makeElement.id === initializationData.vehicle.makeId) {
          initializationData.selectedMake = makeElement;
        }
      });
    }
  }

  fleetLocationVehicleInitializationFactoryInstance = {
    getInitializationData: getInitializationData
  };
  return fleetLocationVehicleInitializationFactoryInstance;
};

fleetLocationVehicleInitializationFactory.$inject = [
  '$q',
  'lookupDataService',
  'skuDataService',
  'locationsDataService',
  'vehiclesDataService'
];

fleet
  .factory('fleetLocationVehicleInitializationFactory', fleetLocationVehicleInitializationFactory);
