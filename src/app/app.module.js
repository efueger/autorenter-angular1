(function init() {
  'use strict';

  angular.module('app.layout.navbar', []);
  angular.module('app.components.student', []);

  var app = angular.module('app', [
    'ui.router',
    'app.layout.navbar',
    'app.components.student'
  ]);

  app.run();
}());
