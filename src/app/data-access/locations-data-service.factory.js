'use strict';

var dataAccess = require('./data-access.module');

var locationsDataService = function locationsDataService($q, $http, generalConfig, strings) {
  function getLocations() {
    return $http({
      method: 'GET',
      url: strings.format('{apiUrl}api/locations', {apiUrl: generalConfig.apiUrl})
    });
  }

  function addLocation(location) {
    return $http({
      method: 'POST',
      url: strings.format('{apiUrl}api/locations', {apiUrl: generalConfig.apiUrl}),
      data: location
    });
  }

  function getLocation(locationId) {
    return $http({
      method: 'GET',
      url: strings.format('{apiUrl}api/locations/{locationId}', {apiUrl: generalConfig.apiUrl, locationId: locationId})
    });
  }

  function updateLocation(location) {
    return $http({
      method: 'PUT',
      url: strings.format('{apiUrl}api/locations', {apiUrl: generalConfig.apiUrl}),
      data: location
    });
  }

  function deleteLocation(locationId) {
    return $http({
      method: 'DELETE',
      url: strings.format('{apiUrl}api/locations/{locationId}', {apiUrl: generalConfig.apiUrl, locationId: locationId})
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
