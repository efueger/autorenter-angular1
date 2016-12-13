'use strict';

var admin = require('./admin.module');
var adminHeaderTemplate = require('./admin.header.html');
var adminUsersTemplate = require('./admin-users.html');
var adminBrandingTemplate = require('./admin-branding.html');

function adminRouteConfig($stateProvider) {
  $stateProvider
    .state('admin', {
      abstract: true,
      views: {
        'moduleHeader@': {
          template: adminHeaderTemplate
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
          template: adminUsersTemplate,
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
          template: adminBrandingTemplate,
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
