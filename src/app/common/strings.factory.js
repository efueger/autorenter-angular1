(function init() {
  'use strict';

  function stringsFactory($window) {
    return $window.strings;
  }

  stringsFactory.$inject = ['$window'];

  angular
    .module('app.common', [])
    .factory('strings', stringsFactory);
}());
