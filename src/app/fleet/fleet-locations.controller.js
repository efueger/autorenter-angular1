'use strict';

var fleet = require('./fleet.module');

function FleetLocationsController() {
  var myData = [
    {
      'firstName': 'Cox',
      'lastName': 'Carney',
      'company': 'Enormo',
      'employed': true
    },
    {
      'firstName': 'Lorraine',
      'lastName': 'Wise',
      'company': 'Comveyer',
      'employed': false
    },
    {
      'firstName': 'Nancy',
      'lastName': 'Waters',
      'company': 'Fuelton',
      'employed': false
    }
  ];

  this.gridOptions = {
    data: myData
  };
}

// FleetLocationsController.$inject = ['$scope'];

fleet.controller('FleetLocationsController', FleetLocationsController);
