'use strict';

var dataAccess = require('./data-access.module');

var locationsDataService = function locationsDataService($q, $http, generalConfig, strings) {
  function getLocations() {
    return $http({
      method: 'GET',
      url: strings.format('{apiUrl}locations', {apiUrl: generalConfig.apiUrlRoot})
    });
  }

  function addLocation(location) {
    return $http({
      method: 'POST',
      url: strings.format('{apiUrl}locations', {apiUrl: generalConfig.apiUrlRoot}),
      data: location
    });
  }

  function getLocation(locationId) {
    return $http({
      method: 'GET',
      url: strings.format('{apiUrl}locations/{locationId}', {apiUrl: generalConfig.apiUrlRoot, locationId: locationId})
    });
  }

  function updateLocation(location) {
    return $http({
      method: 'PUT',
      url: strings.format('{apiUrl}locations/{locationId}', {apiUrl: generalConfig.apiUrlRoot, locationId: location.id}),
      data: location
    });
  }

  function deleteLocation(locationId) {
    return $http({
      method: 'DELETE',
      url: strings.format('{apiUrl}locations/{locationId}', {apiUrl: generalConfig.apiUrlRoot, locationId: locationId})
    });
  }

  return {
    getLocations: getLocations,
    addLocation: addLocation,
    getLocation: getLocation,
    updateLocation: updateLocation,
    deleteLocation: deleteLocation
  };
};

dataAccess.$inject = [
  '$q',
  '$http',
  'generalConfig',
  'strings'
];

dataAccess
  .factory('locationsDataService', locationsDataService);
