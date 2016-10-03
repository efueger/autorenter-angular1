'use strict';

var fleet = require('./fleet.module');

var fleetLocationEditStrategy = function fleetLocationEditStrategy($q, $state, notificationService, strings,
                                                                   statesDataService, locationsDataService) {
  function getInitializationData(locationId) {
    var deferred = $q.defer();
    var initializationData = {};
    var statesPromise = statesDataService.getStates()
      .then(function setResult(response) {
        initializationData.states = response.data;
      });
    var locationPromise = locationsDataService.getLocation(locationId)
      .then(function setResult(response) {
        initializationData.location = response.data;
      });
    $q.all([locationPromise, statesPromise])
      .then(function setResult() {
        deferred.resolve(initializationData);
      });
    return deferred.promise;
  }

  function notifySuccess(siteId) {
    var message = strings.format('Location \'{siteId}\' was updated successfully.', { siteId: siteId });
    notificationService.notifySuccess({
      userMessage: message
    });
  }

  function save(location) {
    locationsDataService.updateLocation(location)
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

fleetLocationEditStrategy.$inject = [
  '$q',
  '$state',
  'notificationService',
  'strings',
  'statesDataService',
  'locationsDataService'
];

fleet
  .factory('fleetLocationEditStrategy', fleetLocationEditStrategy);
