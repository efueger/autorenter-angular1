'use strict';

var dataAccess = require('./data-access.module');

var locationsDataService = function locationsDataService($q, $http, generalConfig) {
  function getLocations() {
    return $http({
      method: 'GET',
      url: generalConfig.apiUrl + 'api/locations'
    });
  }

  function addLocation(location) {
    return $http({
      method: 'POST',
      url: generalConfig.apiUrl + 'api/locations',
      data: location
    });
  }

  function getLocation(locationId) {
    return $http({
      method: 'GET',
      url: generalConfig.apiUrl + 'api/locations/' + locationId
    });
  }

  function updateLocation(location) { // eslint-disable-line no-unused-vars
    return $http({
      method: 'PUT',
      url: generalConfig.apiUrl + 'api/locations',
      data: location
    });
  }

  function deleteLocation(locationId) {
    return $http({
      method: 'DELETE',
      url: generalConfig.apiUrl + 'api/locations/' + locationId
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
  'generalConfig'
];

dataAccess
  .factory('locationsDataService', locationsDataService);
