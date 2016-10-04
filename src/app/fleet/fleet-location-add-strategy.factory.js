'use strict';

var fleet = require('./fleet.module');

var fleetLocationAddStrategy = function fleetLocationAddStrategy($q, $state, notificationService, strings,
                                                                 statesDataService, locationsDataService) {
  function getInitializationData() {
    var deferred = $q.defer();
    statesDataService.getStates()
      .then(function setResult(response) {
        deferred.resolve({
          states: response.data
        });
      });

    return deferred.promise;
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
  '$q',
  '$state',
  'notificationService',
  'strings',
  'statesDataService',
  'locationsDataService'
];

fleet
  .factory('fleetLocationAddStrategy', fleetLocationAddStrategy);
