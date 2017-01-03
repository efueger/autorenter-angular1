'use strict';

var fleet = require('./fleet.module');

var fleetLocationViewStrategy = function fleetLocationViewStrategy(fleetLocationInitializationFactory) {
  var getInitializationData = function getInitializationData(locationId) {
    return fleetLocationInitializationFactory.getInitializationData(locationId)
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
  'fleetLocationInitializationFactory'
];

fleet
  .factory('fleetLocationViewStrategy', fleetLocationViewStrategy);
