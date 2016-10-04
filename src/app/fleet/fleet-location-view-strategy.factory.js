'use strict';

var fleet = require('./fleet.module');

var fleetLocationViewStrategy = function fleetLocationViewStrategy($q, $state, fleetLocationEditStrategy) {
  var getInitializationData = function getInitializationData(locationId) {
    var deferred = $q.defer();
    fleetLocationEditStrategy.getInitializationData(locationId)
      .then(function setResult(initializationData) {
        initializationData.states.forEach(function setState(stateElement) {
          if (stateElement.stateCode === initializationData.location.state) {
            initializationData.selectedState = stateElement;
          }
        });
        deferred.resolve(initializationData);
      });
    return deferred.promise;
  };

  return {
    getInitializationData: getInitializationData,
    save: function nullOp() { }
  };
};

fleetLocationViewStrategy.$inject = [
  '$q',
  '$state',
  'fleetLocationEditStrategy'
];

fleet
  .factory('fleetLocationViewStrategy', fleetLocationViewStrategy);
