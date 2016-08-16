'use strict';

var loggingModule = require('./logging.module');

loggingModule.constant('xhr', {
  create: function() {
    return new XMLHttpRequest();
  }
});
