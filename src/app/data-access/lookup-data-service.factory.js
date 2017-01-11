'use strict';

var dataAccess = require('./data-access.module');

var lookupDataService = function lookupDataService($q, $http, generalConfig, strings) {

  function getStates() {
    return $http({
      method: 'GET',
      url: strings.format('{apiUrl}lookup-data?states', {apiUrl: generalConfig.apiUrlRoot})
    })
    .then(function setResult(response) {
      return {data: response.data.lookupData};
    });
  }

  return {
    getStates: getStates
    // TODO: getVehicleLookupData: getVehicleLookupData
  };
};

dataAccess.$inject = [
  '$q',
  '$http',
  'generalConfig',
  'strings'
];

dataAccess
  .factory('lookupDataService', lookupDataService);
