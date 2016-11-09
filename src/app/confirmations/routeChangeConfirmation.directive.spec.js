describe('fa.confirmations.faRouteChangeConfirmation > ', function describeImpl() {
  var $rootScope;
  var confirmationService;
  var $q;
  var $state;
  var form;

  var toStateEventArg = {name: 'desired.state.name'};
  var toStateParam = {'foo': 'bar'};

  var htmlText = '<form name="testForm" fa-route-change-confirmation></form>';

  beforeEach(angular.mock.module('fa.confirmations'));

  beforeEach(inject(function injectImpl(_$rootScope_,
                                        _confirmationService_,
                                        _$state_,
                                        _$compile_,
                                        _$q_) {
    $rootScope = _$rootScope_;
    confirmationService = _confirmationService_;
    $state = _$state_;
    $q = _$q_;

    var runningScope = $rootScope.$new();
    _$compile_(htmlText)(runningScope);
    $rootScope.$digest();
    form = runningScope.testForm;

    confirmationService.show = function show() {
      return $q.when();
    };
    $state.go = function go() {
      return;
    };
  }));

  it('presents confirmation dialog if submitted form is dirty', function testImpl() {
    var showSpy = sinon.spy(confirmationService, 'show');
    form.$dirty = true;
    $rootScope.$emit('$stateChangeStart', toStateEventArg, toStateParam);
    showSpy.getCall(0).args[0].should.equal('Are you sure you want to leave this page?');
  });

  it('allows navigation if confirmation is accepted', function testImpl() {
    var goSpy = sinon.spy($state, 'go');
    form.$dirty = true;
    $rootScope.$emit('$stateChangeStart', toStateEventArg, toStateParam);
    $rootScope.$apply();
    var actualArgs = goSpy.getCall(0).args;
    actualArgs.should.deep.equal([toStateEventArg.name, toStateParam]);
  });

  it('prevents navigation if confirmation is declined', function testImpl() {
    confirmationService.show = function show() {
      var deferred = $q.defer();
      deferred.reject();
      return deferred.promise;
    };
    var goSpy = sinon.spy($state, 'go');
    form.$dirty = true;
    $rootScope.$emit('$stateChangeStart', toStateEventArg, toStateParam);
    $rootScope.$apply();
    goSpy.called.should.be.false;
  });

  it('does not present confirmation dialog if submitted form is clean', function testImpl() {
    var showSpy = sinon.spy(confirmationService, 'show');
    form.$dirty = false;
    $rootScope.$emit('$stateChangeStart', toStateEventArg, toStateParam);
    showSpy.called.should.be.false;
  });

  it('allows unconfirmed navigation if submitted form is clean', function testImpl() {
    var goSpy = sinon.spy($state, 'go');
    form.$dirty = false;
    $rootScope.$emit('$stateChangeStart', toStateEventArg, toStateParam);
    var actualArgs = goSpy.getCall(0).args;
    actualArgs.should.deep.equal([toStateEventArg.name, toStateParam]);
  });
});
