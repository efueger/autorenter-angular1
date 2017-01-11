'use strict';

var fleet = require('./fleet.module');

var fleetLocationAddStrategy = function fleetLocationAddStrategy($state, notificationService, strings,
                                                                 lookupDataService, locationsDataService) {
  var fleetLocationAddStrategyInstance;

  function getInitializationData() {
    return lookupDataService.getStates()
      .then(function setResult(response) {
        return { states: response.data.states };
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
  'lookupDataService',
  'locationsDataService'
];

fleet
  .factory('fleetLocationAddStrategy', fleetLocationAddStrategy);
