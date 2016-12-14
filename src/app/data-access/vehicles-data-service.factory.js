'use strict';

var dataAccess = require('./data-access.module');

var vehiclesDataService = function vehiclesDataService($q, $http, generalConfig, strings) {
  function getVehicles(locationId) {
    return $http({
      method: 'GET',
      url: strings.format('{apiUrl}api/locations/{locationId}/vehicles/', {apiUrl: generalConfig.apiUrl, locationId: locationId})
    });
  }

  function addVehicleToLocation(locationId, vehicle) {
    return $http({
      method: 'POST',
      url: strings.format('{apiUrl}api/locations/{locationId}/vehicles/', {apiUrl: generalConfig.apiUrl, locationId: locationId}),
      data: vehicle
    });
  }

  function getVehicle(vehicleId) {
    return $http({
      method: 'GET',
      url: strings.format('{apiUrl}api/vehicles/{vehicleId}', {apiUrl: generalConfig.apiUrl, vehicleId: vehicleId})
    });
  }

  function updateVehicle(vehicle) {
    return $http({
      method: 'PUT',
      url: strings.format('{apiUrl}api/vehicles/{vehicleId}', {apiUrl: generalConfig.apiUrl, vehicleId: vehicle.id}),
      data: vehicle
    });
  }

  function deleteVehicle(vehicleId) {
    return $http({
      method: 'DELETE',
      url: strings.format('{apiUrl}api/vehicles/{vehicleId}', {apiUrl: generalConfig.apiUrl, vehicleId: vehicleId})
    });
  }

  return {
    getVehicles: getVehicles,
    addVehicleToLocation: addVehicleToLocation,
    getVehicle: getVehicle,
    updateVehicle: updateVehicle,
    deleteVehicle: deleteVehicle
  };
};

dataAccess.$inject = [
  '$q',
  '$http',
  'generalConfig',
  'strings'
];

dataAccess
  .factory('vehiclesDataService', vehiclesDataService);
