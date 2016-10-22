'use strict';

var confirmations = require('./confirmations.module');

function routeChangeConfirmationDirective($rootScope, $state, confirmationService) {
  function goToState(stateChangeStartHandler, stateName, toParams) {
    stateChangeStartHandler();
    $state.go(stateName, toParams);
  }

  function handleStateChange(
    stateChangeStartHandler,
    formControllers,
    event,
    toState,
    toParams
  ) {
    event.preventDefault();
    var formController = formControllers[0];
    if (formController.$submitted || !formController.$dirty) {
      goToState(stateChangeStartHandler, toState.name, toParams);
      return;
    }
    confirmationService.show('Are you sure you want to leave this page?')
      .then(function goToStateImpl() {
        goToState(stateChangeStartHandler, toState.name, toParams);
      });
  }

  var link = function link($scope, $element, attributes, formControllers) {
    var stateChangeStartHandler = $rootScope.$on('$stateChangeStart',
      function stateChangeStartHandlerImpl(event, toState, toParams) {
        handleStateChange.bind(this, stateChangeStartHandler, formControllers)(event, toState, toParams);
      });
  };

  var directive = {
    scope: {},
    require: ['form'],
    restrict: 'A',
    link: link
  };

  return directive;
}

routeChangeConfirmationDirective.$inject = [
  '$rootScope',
  '$state',
  'confirmationService'
];

confirmations
  .directive('faRouteChangeConfirmation', routeChangeConfirmationDirective);
