describe('fa.fleet.FleetLocationDetailsController > ', function describeImpl() {
  var $q;
  var $rootScope;
  var $state;
  var fleetLocationStrategyFactory;
  var implementationStrategy;
  var fleetLocationDetailsModeService;
  var controller;

  var navigationStateId = 'fooBar';
  var initializationData = {
    location: {
      id: '1',
      siteId: 'ind',
      name: 'Indianapolis International Airport',
      vehicleCount: 255,
      city: 'Indianapolis',
      stateCode: 'IN'
    },
    states: [
      {
        'stateCode': 'IL',
        'name': 'Illinois'
      },
      {
        'stateCode': 'IN',
        'name': 'Indiana'
      }
    ],
    selectedState: {
      'stateCode': 'IN',
      'name': 'Indiana'
    }
  };

  var getInitializationDataStub;

  beforeEach(angular.mock.module('fa.fleet'));

  beforeEach(inject(function injectImpl(_$q_,
                                        _$rootScope_,
                                        _fleetLocationStrategyFactory_,
                                        _fleetLocationDetailsModeService_,
                                        _fleetLocationEditStrategy_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    fleetLocationStrategyFactory = _fleetLocationStrategyFactory_;
    fleetLocationDetailsModeService = _fleetLocationDetailsModeService_;
    implementationStrategy = _fleetLocationEditStrategy_;

    $state = {
      params: {
        locationId: navigationStateId
      }
    };

    // We return a known strategy so that
    //  1) the controller is initialized correctly, and
    //  2) we can create stubs and spies based on it.
    fleetLocationStrategyFactory.getStrategy = function getStrategy() {
      return implementationStrategy;
    };

    getInitializationDataStub = sinon.stub(
      implementationStrategy,
      'getInitializationData',
      function getInitializationData() {
        var deferred = $q.defer();
        deferred.resolve(initializationData);
        return deferred.promise;
      }
    );

    angular.mock.inject([
      '$controller',
      function assignController($controller) {
        controller = $controller('FleetLocationDetailsController', {
          '$state': $state,
          'fleetLocationStrategyFactory': fleetLocationStrategyFactory,
          'fleetLocationDetailsModeService': fleetLocationDetailsModeService
        });
      }
    ]);

    // Run the controller initialization function...
    $rootScope.$apply();
  }));

  describe('initialize', function initializeTest() {
    it('calls getInitializationData with correct argument', function testImpl() {
      getInitializationDataStub.calledWith(navigationStateId).should.be.true;
    });

    it('sets the correct location', function testImpl() {
      controller.location.should.deep.equal(initializationData.location);
    });

    it('sets the correct states', function testImpl() {
      controller.states.should.deep.equal(initializationData.states);
    });

    it('sets the correct selected state', function testImpl() {
      controller.selectedState.should.deep.equal(initializationData.selectedState);
    });
  });

  describe('isEditable', function isEditableTest() {
    var isAddModeStub;
    var isEditModeStub;

    beforeEach(function beforeEach() {
      isAddModeStub = sinon.stub(fleetLocationDetailsModeService, 'isAddMode');
      isEditModeStub = sinon.stub(fleetLocationDetailsModeService, 'isEditMode');
    });

    it('returns true if is in Edit mode', function testImpl() {
      isAddModeStub.returns(false);
      isEditModeStub.returns(true);
      controller.isEditable().should.be.true;
    });

    it('returns true if is in Add mode', function testImpl() {
      isAddModeStub.returns(true);
      isEditModeStub.returns(false);
      controller.isEditable().should.be.true;
    });

    it('returns false if is not in Add or Edit mode', function testImpl() {
      isAddModeStub.returns(false);
      isEditModeStub.returns(false);
      controller.isEditable().should.be.false;
    });
  });

  it('save saves the correct location', function testImpl() {
    var saveSpy = sinon.spy(implementationStrategy, 'save');
    controller.save();
    saveSpy.calledWith(initializationData.location).should.be.true;
  });
});
