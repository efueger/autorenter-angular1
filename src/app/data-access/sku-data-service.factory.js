'use strict';

var dataAccess = require('./data-access.module');

var skuDataService = function skuDataService($http, generalConfig, strings) {

  function getSkus() {
    return $http({
      method: 'GET',
      url: strings.format('{apiUrl}skus', {apiUrl: generalConfig.apiUrlRoot})
    });
  }

  return {
    getSkus: getSkus
  };
};

dataAccess.$inject = [
  '$http',
  'generalConfig',
  'strings'
];

dataAccess
  .factory('skuDataService', skuDataService);
