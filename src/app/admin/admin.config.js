'use strict';

var admin = require('./admin.module');

function adminRouteConfig($stateProvider) {
  $stateProvider
    .state('admin', {
      abstract: true,
      views: {
        'moduleHeader@': {
          templateUrl: 'app/admin.header.html'
        }
      }
    })
    .state('admin.users', {
      abstract: true
    })
    .state('admin.users.list', {
      url: '/admin/users',
      views: {
        '@': {
          templateUrl: 'app/admin-users.html',
          controller: 'AdminUsersController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: 'Users'
      }
    })
    .state('admin.branding', {
      url: '/admin/branding',
      views: {
        '@': {
          templateUrl: 'app/admin-branding.html',
          controller: 'AdminBrandingController',
          controllerAs: 'vm'
        }
      },
      ncyBreadcrumb: {
        label: 'Branding'
      }
    });
}

adminRouteConfig.$inject = ['$stateProvider'];


admin.config(adminRouteConfig);
