'use strict';

var fleet = require('./fleet.module');

var fleetLocationViewStrategy = function fleetLocationViewStrategy(fleetLocationEditStrategy) {
  var getInitializationData = function getInitializationData(locationId) {
    return fleetLocationEditStrategy.getInitializationData(locationId)
      .then(function setResult(initializationData) {
        initializationData.states.forEach(function setState(stateElement) {
          if (stateElement.stateCode === initializationData.location.state) {
            initializationData.selectedState = stateElement;
          }
        });
        return initializationData;
      });
  };

  return {
    getInitializationData: getInitializationData,
    save: function nullOp() { }
  };
};

fleetLocationViewStrategy.$inject = [
  'fleetLocationEditStrategy'
];

fleet
  .factory('fleetLocationViewStrategy', fleetLocationViewStrategy);
