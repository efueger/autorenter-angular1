'use strict';

var fleet = require('./fleet.module');

var fleetLocationEditStrategy = function fleetLocationEditStrategy($q, $state, notificationService, strings,
                                                                   statesDataService, locationsDataService, fleetLocationInitializationFactory) {
  var fleetLocationEditStrategyInstance


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

  function notifySuccess(siteId) {
    var message = strings.format('Location \'{siteId}\' was updated successfully.', { siteId: siteId });
    notificationService.notifySuccess({
      userMessage: message
    });
  }

  function save(location) {
    locationsDataService.updateLocation(location)
      .then(function notifyAndNavigate() {
        fleetLocationEditStrategyInstance.notifySuccess(location.siteId);
        $state.go('fleet.locations.list');
      });
  }

  fleetLocationEditStrategyInstance = {
    getInitializationData: getInitializationData,
    save: save,
    notifySuccess: notifySuccess
  };
  return fleetLocationEditStrategyInstance;
};

fleetLocationEditStrategy.$inject = [
  '$q',
  '$state',
  'notificationService',
  'strings',
  'statesDataService',
  'locationsDataService',
  'fleetLocationInitializationFactory'
];

fleet
  .factory('fleetLocationEditStrategy', fleetLocationEditStrategy);
