'use strict';

var fleet = require('./fleet.module');

var fleetLocationAddStrategy = function fleetLocationAddStrategy($state, notificationService, strings,
                                                                 statesDataService, locationsDataService) {
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
        notifySuccess(location.siteId);
        $state.go('fleet.locations.list');
      });
  }

  return {
    getInitializationData: getInitializationData,
    save: save
  };
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
