'use strict';

function buildStrings($windowProvider) {
  function strings() {
    return $windowProvider.$get().strings;
  }

  return { strings: strings };
}

buildStrings.$inject = ['$windowProvider'];

angular.module('strings', []).constant('strings', buildStrings);
