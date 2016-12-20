'use strict';

var navBar = require('./nav-bar.module');
var navBarTemplate = require('./nav-bar.component.html');

navBar.component('faNavBar', {
  template: navBarTemplate,
  bindings: {}
});
