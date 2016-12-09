'use strict';

var dataAccess = require('./data-access.module');

var locationsDataService = function locationsDataService($q) {
  // TODO: This implementation will be replaced once we have API support...
  var locations = [
    {
      id: '1',
      siteId: 'ind',
      name: 'Indianapolis International Airport',
      vehicleCount: 255,
      city: 'Indianapolis',
      stateCode: 'IN'
    },
    {
      id: '2',
      siteId: 'ord',
      name: 'Chicago O\'Hare Airport',
      vehicleCount: 515,
      city: 'Chicago',
      stateCode: 'IL'
    }
  ];

  var locationVehicles = [
    {
      location: {
        id: '1',
        siteId: 'ind',
        name: 'Indianapolis International Airport',
        vehicleCount: 255,
        city: 'Indianapolis',
        stateCode: 'IN'
      },
      vehicles: [{id: 'ab'}, {id: 'bc'}]
    },
    {
      location: {
        id: '2',
        siteId: 'ord',
        name: 'Chicago O\'Hare Airport',
        vehicleCount: 515,
        city: 'Chicago',
        stateCode: 'IL'
      },
      vehicles: [{id: 'cd'}, {id: 'de'}]
    }
  ];

  var nextLocationId = 3;

  function getLocations() {
    var deferred = $q.defer();
    deferred.resolve({data: locations});
    return deferred.promise;
  }

  function getLocationByVehicleId(vehicleId) {
    var deferred = $q.defer();
    var locationByVehicle;
    locationVehicles.forEach(function getVehicles(locationVehicle) {
      locationVehicle.vehicles.forEach(function matchVehicleId(vehicle) {
        if (vehicle.id === vehicleId) {
          locationByVehicle = locationVehicle.location;
        }
      });
    });
    deferred.resolve({data: locationByVehicle});
    return deferred.promise;
  }

  function addLocation(location) {
    location.id = nextLocationId++;
    var deferred = $q.defer();
    locations.push(location);
    deferred.resolve({});
    return deferred.promise;
  }

  function getLocation(locationId) {
    var deferred = $q.defer();
    var location;
    locations.forEach(function findLocation(locationElement) {
      if (locationElement.id + '' === locationId) {
        location = locationElement;
      }
    });
    deferred.resolve({data: location});
    return deferred.promise;
  }

  function updateLocation(location) { // eslint-disable-line no-unused-vars
    var deferred = $q.defer();
    deferred.resolve({});
    return deferred.promise;
  }

  function deleteLocation(locationId) {
    var deferred = $q.defer();
    getLocation(locationId)
      .then(function removeFromArray(response) {
        var indexToRemove = locations.indexOf(response.data);
        locations.splice(indexToRemove, 1);
      });
    deferred.resolve({});
    return deferred.promise;
  }

  return {
    getLocations: getLocations,
    getLocationByVehicleId: getLocationByVehicleId,
    addLocation: addLocation,
    getLocation: getLocation,
    updateLocation: updateLocation,
    deleteLocation: deleteLocation
  };
};

dataAccess.$inject = [
  '$q'
];

dataAccess
  .factory('locationsDataService', locationsDataService);
