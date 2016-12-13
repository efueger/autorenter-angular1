'use strict';

var app = require('./app.module.js');

function config($locationProvider) {
  $locationProvider.html5Mode(true);
}

config.$inject = ['$locationProvider'];

app.config(config);
