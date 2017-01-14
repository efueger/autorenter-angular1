'use strict';

var fleet = require('./fleet.module');

function FleetLocationVehicleDetailsController($log, $state, fleetLocationVehicleStrategyFactory, fleetLocationVehicleDetailsModeService) {
  var vm = this;

  vm.location = {};
  vm.vehicle = {};
  vm.lookupDataCache = {};
  vm.makes = {};
  vm.skus = {};
  vm.models = {};
  vm.years = {};
  vm.colors = {};
  vm.selectedMake = {};
  vm.selectedModel = {};

  var implementationStrategy;

  vm.initialize = function initialize() {
    implementationStrategy = fleetLocationVehicleStrategyFactory.getStrategy();
    implementationStrategy.getInitializationData($state.params.locationId, $state.params.vehicleId)
      .then(function init(initializationData) {
        vm.location = initializationData.location;
        vm.vehicle = initializationData.vehicle || {};
        vm.makes = initializationData.makes;
        vm.skus = initializationData.skus;
        vm.lookupDataCache.models = initializationData.models;
        vm.lookupDataCache.years = initializationData.years;
        vm.lookupDataCache.colors = initializationData.colors;
        vm.selectedMake = initializationData.selectedMake;
        vm.selectedModel = initializationData.selectedModel;
        vm.synchLookups();
      });
  };

  vm.synchLookups = function synchLookups() {
    if (vm.vehicle.makeId) {
      vm.models = vm.skus.filter(function filterModelIds(sku) {
        return sku.makeId === vm.vehicle.makeId;
      })
      .map(function getModel(sku) {
        var matchingModel;
        vm.lookupDataCache.models.forEach(function findModel(model) {
          if (model.id === sku.modelId) {
            matchingModel = model;
          }
        });
        return matchingModel;
      })
      .filter(function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      });

      if (vm.vehicle.modelId) {
        vm.years = vm.skus.filter(function filterYears(sku) {
          return sku.modelId === vm.vehicle.modelId;
        })
        .map(function getYear(sku) {
          return sku.year;
        })
        .filter(function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        });

        if (vm.vehicle.year) {
          vm.colors = vm.skus.filter(function filterColors(sku) {
            return sku.modelId === vm.vehicle.modelId &&
              sku.year === vm.vehicle.year;
          })
          .map(function getColor(sku) {
            return sku.color;
          })
          .filter(function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          });
        }
      }
    }
  };

  vm.isEditable = function isEditable() {
    return fleetLocationVehicleDetailsModeService.isAddMode() || fleetLocationVehicleDetailsModeService.isEditMode();
  };

  vm.save = function save() {
    implementationStrategy.save(vm.location.id, vm.vehicle);
  };

  vm.initialize();
}

FleetLocationVehicleDetailsController.$inject = [
  '$log',
  '$state',
  'fleetLocationVehicleStrategyFactory',
  'fleetLocationVehicleDetailsModeService'
];

fleet.controller('FleetLocationVehicleDetailsController', FleetLocationVehicleDetailsController);
