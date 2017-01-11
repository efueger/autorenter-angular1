'use strict';

var fleet = require('./fleet.module');

var fleetLocationEditStrategy = function fleetLocationEditStrategy($q, $state, notificationService, strings,
                                                                   lookupDataService, locationsDataService, fleetLocationInitializationFactory) {
  var fleetLocationEditStrategyInstance;

  var getInitializationData = function getInitializationData(locationId) {
    return fleetLocationInitializationFactory.getInitializationData(locationId);
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
  'lookupDataService',
  'locationsDataService',
  'fleetLocationInitializationFactory'
];

fleet
  .factory('fleetLocationEditStrategy', fleetLocationEditStrategy);
