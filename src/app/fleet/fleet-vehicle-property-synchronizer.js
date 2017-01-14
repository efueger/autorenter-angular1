'use strict';

var fleet = require('./fleet.module');

var fleetVehiclePropertySynchronizer = function fleetVehiclePropertySynchronizer() {

  var fleetVehiclePropertySynchronizerInstance;
  var cache = {};

  function initialize(initializationData) {
    cache.skus = initializationData.skus;
    cache.models = initializationData.models;
  }

  function getSynchronizedData(vehicle) {
    var synchedData = {
      models: [],
      years: [],
      colors: []
    };

    if (vehicle && vehicle.makeId) {
      synchedData.models = getSynchedModels(vehicle);
      synchedData.years = getSynchedYears(vehicle);
      synchedData.colors = getSynchedColors(vehicle);
    }

    return synchedData;
  }

  function isUniqueInArray(value, index, self) {
    return self.indexOf(value) === index;
  }

  function getSynchedModels(vehicle) {
    return cache.skus.filter(function filterModelIds(sku) {
      return sku.makeId === vehicle.makeId;
    })
    .map(function getModel(sku) {
      var matchingModel;
      cache.models.forEach(function findModel(model) {
        if (model.id === sku.modelId) {
          matchingModel = model;
        }
      });
      return matchingModel;
    })
    .filter(isUniqueInArray);
  }

  function getSynchedYears(vehicle) {
    return cache.skus.filter(function filterYears(sku) {
      return sku.modelId === vehicle.modelId;
    })
    .map(function getYear(sku) {
      return sku.year;
    })
    .filter(isUniqueInArray);
  }

  function getSynchedColors(vehicle) {
    return cache.skus.filter(function filterColors(sku) {
      return sku.modelId === vehicle.modelId &&
        sku.year === vehicle.year;
    })
    .map(function getColor(sku) {
      return sku.color;
    })
    .filter(isUniqueInArray);
  }

  fleetVehiclePropertySynchronizerInstance = {
    initialize: initialize,
    getSynchronizedData: getSynchronizedData
  };
  return fleetVehiclePropertySynchronizerInstance;
};

fleet
  .factory('fleetVehiclePropertySynchronizer', fleetVehiclePropertySynchronizer);
