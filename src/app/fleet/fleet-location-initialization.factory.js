'use strict';

var fleet = require('./fleet.module');

var fleetLocationInitializationFactory = function fleetLocationInitializationFactory($q,
                                                                   statesDataService, locationsDataService) {
  var fleetLocationInitializationFactoryInstance;

  function getInitializationData(locationId) {
    var deferred = $q.defer();
    var initializationData = {};
    var statesPromise = statesDataService.getStates()
      .then(function setResult(response) {
        initializationData.states = response.data;
      });
    var locationPromise = locationsDataService.getLocation(locationId)
      .then(function setResult(response) {
        initializationData.location = response.data;
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
  'statesDataService',
  'locationsDataService'
];

fleet
  .factory('fleetLocationInitializationFactory', fleetLocationInitializationFactory);
