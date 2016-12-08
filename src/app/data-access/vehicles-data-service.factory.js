'use strict';

var dataAccess = require('./data-access.module');

var vehiclesDataService = function vehiclesDataService($q) {
  // TODO: This implementation will be replaced once we have API support...
  var locationVehicles = [
    {
      locationId: '1',
      vehicles: [
        {
          id: 'ab',
          vin: '1XKDPB0X04R047346',
          make: 'Toyota',
          model: 'Tercel',
          year: 1990,
          miles: 452303,
          color: 'Gold',
          isRentToOwn: false,
        },
        {
          id: 'bc',
          vin: '1HVLPHXM4GHA52708',
          make: 'Honda',
          model: 'Civic',
          year: 1994,
          miles: 282563,
          color: 'Silver',
          isRentToOwn: true,
        }]
    },
    {
      locationId: '2',
      vehicles: [
        {
          id: 'cd',
          vin: '2XKDPB0X04R047346',
          make: 'Chevrolet',
          model: 'Impala',
          year: 1996,
          miles: 452303,
          color: 'Black',
          isRentToOwn: true,
        },
        {
          id: 'de',
          vin: '2HVLPHXM4GHA52708',
          make: 'Ford',
          model: 'Pinto',
          year: 1973,
          miles: 282563,
          color: 'Orange',
          isRentToOwn: false,
        }]
    }
  ];

  var nextVehicleId = 5;

  function getVehicles(locationId) {
    var deferred = $q.defer();
    var vehicles = [];
    locationVehicles.forEach(function findVehicles(locationVehicleElement) {
      if (locationVehicleElement.locationId === locationId) {
        vehicles = locationVehicleElement.vehicles;
      }
    });
    deferred.resolve({ data: vehicles });
    return deferred.promise;
  }

  function addVehicleToLocation(locationId, vehicle) {
    vehicle.id = nextVehicleId++;
    var deferred = $q.defer();
    locationVehicles.forEach(function findLocationVehicle(locationVehicleElement) {
      if (locationVehicleElement.locationId === locationId) {
        locationVehicleElement.vehicles.push(vehicle);
      }
    });
    deferred.resolve({});
    return deferred.promise;
  }

  function getVehicle(vehicleId) {
    var deferred = $q.defer();
    var vehicle;
    locationVehicles.forEach(function locationVehicleEach(locationVehicleElement) {
      locationVehicleElement.vehicles.forEach(function findVehicle(vehicleElement) {
        if (vehicleElement.id + '' === vehicleId) {
          vehicle = vehicleElement;
        }
      });
    });
    deferred.resolve({ data: vehicle });
    return deferred.promise;
  }

  function updateVehicle(vehicle) { // eslint-disable-line no-unused-vars
    var deferred = $q.defer();
    deferred.resolve({});
    return deferred.promise;
  }

  function deleteVehicle(vehicleId) {
    var deferred = $q.defer();
    getVehicle(vehicleId)
      .then(function removeFromArray(response) {
        locationVehicles.forEach(function locationVehicleEach(locationVehicleElement) {
          var vehicles = locationVehicleElement.vehicles;
          vehicles.forEach(function findVehicle(vehicleElement) {
            if (vehicleElement.id + '' === vehicleId) {
              var indexToRemove = locationVehicleElement.vehicles.indexOf(response.data);
              locationVehicleElement.vehicles.splice(indexToRemove, 1);
            }
          });
        });
      });
    deferred.resolve({});
    return deferred.promise;
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
  '$q'
];

dataAccess
  .factory('vehiclesDataService', vehiclesDataService);
