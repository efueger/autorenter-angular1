'use strict';

var fleet = require('./fleet.module');

function fleetRouteConfig($stateProvider) {
  $stateProvider.state(
    'fleet',
    {
      url: '/fleet',
      templateUrl: 'app/fleet.html',
      controller: 'FleetController',
      controllerAs: 'vm'
    }
  );
}

fleet.config(['$stateProvider', fleetRouteConfig]);
