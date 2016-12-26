'use strict';

var fleet = require('./fleet.module');

var fleetLocationViewStrategy = function fleetLocationViewStrategy(fleetLocationInitialization) {
  var getInitializationData = function getInitializationData(locationId) {
    return fleetLocationInitialization.getInitializationData(locationId)
      .then(function setResult(initializationData) {
        initializationData.states.forEach(function setState(stateElement) {
          if (stateElement.stateCode === initializationData.location.stateCode) {
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
  'fleetLocationInitialization'
];

fleet
  .factory('fleetLocationViewStrategy', fleetLocationViewStrategy);
