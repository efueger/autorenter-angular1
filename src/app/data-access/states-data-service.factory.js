'use strict';

var dataAccess = require('./data-access.module');

var statesDataService = function statesDataService($q) {
  // TODO: This implementation will be replaced once we have API support...
  var states = [
    {
      'stateCode': 'AL',
      'name': 'Alabama'
    },
    {
      'stateCode': 'AK',
      'name': 'Alaska'
    },
    {
      'stateCode': 'AZ',
      'name': 'Arizona'
    },
    {
      'stateCode': 'IL',
      'name': 'Illinois'
    },
    {
      'stateCode': 'IN',
      'name': 'Indiana'
    },
    {
      'stateCode': 'WV',
      'name': 'West Virginia'
    }
  ];

  function getStates() {
    var deferred = $q.defer();
    deferred.resolve({data: {states: states}});
    return deferred.promise;
  }

  return {
    getStates: getStates
  };
};

dataAccess.$inject = [
  '$q'
];

dataAccess
  .factory('statesDataService', statesDataService);
