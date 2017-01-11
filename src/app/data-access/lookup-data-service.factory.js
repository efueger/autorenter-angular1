'use strict';

var dataAccess = require('./data-access.module');

var lookupDataService = function lookupDataService($http, generalConfig, strings) {

  function getStates() {
    return $http({
      method: 'GET',
      url: strings.format('{apiUrl}lookup-data?states', {apiUrl: generalConfig.apiUrlRoot})
    })
    .then(function setResult(response) {
      return {data: response.data.lookupData};
    });
  }

  function getVehicleLookupData() {
    return $http({
      method: 'GET',
      url: strings.format('{apiUrl}lookup-data?makes&models&colors', { apiUrl: generalConfig.apiUrlRoot })
    });
  }

  return {
    getStates: getStates,
    getVehicleLookupData: getVehicleLookupData
  };
};

dataAccess.$inject = [
  '$http',
  'generalConfig',
  'strings'
];

dataAccess
  .factory('lookupDataService', lookupDataService);
