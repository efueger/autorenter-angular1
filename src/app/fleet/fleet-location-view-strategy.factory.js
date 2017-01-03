'use strict';

var fleet = require('./fleet.module');

var fleetLocationViewStrategy = function fleetLocationViewStrategy(fleetLocationInitializationFactory) {
  var getInitializationData = function getInitializationData(locationId) {
    return fleetLocationInitializationFactory.getInitializationData(locationId)      
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
