'use strict';

var app = require('./app.module');

function config($locationProvider) {
  $locationProvider.html5Mode(true);
}

config.$inject = ['$locationProvider'];

app.config(config);
