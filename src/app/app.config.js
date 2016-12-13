'use strict';

var app = require('./index.module.js');

function config($locationProvider) {
  $locationProvider.html5Mode(true);
}

config.$inject = ['$locationProvider'];

app.config(config);
