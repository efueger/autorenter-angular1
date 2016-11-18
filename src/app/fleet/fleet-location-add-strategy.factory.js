'use strict';

var fleet = require('./fleet.module');

var fleetLocationAddStrategy = function fleetLocationAddStrategy($state, notificationService, strings,
                                                                 statesDataService, locationsDataService) {
  var fleetLocationAddStrategyInstance;

  function getInitializationData() {
    return statesDataService.getStates()
      .then(function setResult(response) {
        return { states: response.data };
      });
  }

  function notifySuccess(siteId) {
    var message = strings.format('Location \'{siteId}\' was added successfully.', { siteId: siteId });
    notificationService.notifySuccess({
      userMessage: message
    });
  }

  function save(location) {
    locationsDataService.addLocation(location)
      .then(function notifyAndNavigate() {
        fleetLocationAddStrategyInstance.notifySuccess(location.siteId);
        $state.go('fleet.locations.list');
      });
  }

  fleetLocationAddStrategyInstance = {
    getInitializationData: getInitializationData,
    save: save,
    notifySuccess: notifySuccess
  };
  return fleetLocationAddStrategyInstance;
};

fleetLocationAddStrategy.$inject = [
  '$state',
  'notificationService',
  'strings',
  'statesDataService',
  'locationsDataService'
];

fleet
  .factory('fleetLocationAddStrategy', fleetLocationAddStrategy);
