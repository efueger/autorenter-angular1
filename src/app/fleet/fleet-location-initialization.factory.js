'use strict';

var fleet = require('./fleet.module');

var fleetLocationInitializationFactory = function fleetLocationInitializationFactory($q,
                                                                   lookupDataService, locationsDataService) {
  var fleetLocationInitializationFactoryInstance;

  function getInitializationData(locationId) {
    var deferred = $q.defer();
    var initializationData = {};
    var statesPromise = lookupDataService.getStates()
      .then(function setResult(response) {
        initializationData.states = response.data.states;
      });
    var locationPromise = locationsDataService.getLocation(locationId)
      .then(function setResult(response) {
        initializationData.location = response.data.location;
      });
    $q.all([locationPromise, statesPromise])
      .then(function setResult() {
        initializationData.states.forEach(function setState(stateElement) {
          if (stateElement.stateCode === initializationData.location.stateCode) {
            initializationData.selectedState = stateElement;
          }
        });
        deferred.resolve(initializationData);
      });
    return deferred.promise;
  }

  fleetLocationInitializationFactoryInstance = {
    getInitializationData: getInitializationData
  };
  return fleetLocationInitializationFactoryInstance;
};

fleetLocationInitializationFactory.$inject = [
  '$q',
  'lookupDataService',
  'locationsDataService'
];

fleet
  .factory('fleetLocationInitializationFactory', fleetLocationInitializationFactory);
