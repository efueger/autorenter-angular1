/**
 * Adds the admin routes to the Auto Renter application
 */
'use strict';

var admin = require('./admin.module');

function adminRouteConfig($stateProvider) {
  $stateProvider.state(
    'admin',
    {
      url: '/admin',
      templateUrl: 'app/admin.html',
      controller: 'AdminController',
      controllerAs: 'vm'
    }
  );
}

admin.config(['$stateProvider', adminRouteConfig]);
