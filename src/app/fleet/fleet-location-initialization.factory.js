'use strict';

var fleet = require('./fleet.module');

var fleetLocationInitialization = function fleetLocationInitialization($q,
                                                                   statesDataService, locationsDataService) {
  var fleetLocationInitializationInstance;

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
        deferred.resolve(initializationData);
      });
    return deferred.promise;
  }

  fleetLocationInitializationInstance = {
    getInitializationData: getInitializationData
  };
  return fleetLocationInitializationInstance;
};

fleetLocationInitialization.$inject = [
  '$q',
  'statesDataService',
  'locationsDataService'
];

fleet
  .factory('fleetLocationInitialization', fleetLocationInitialization);
