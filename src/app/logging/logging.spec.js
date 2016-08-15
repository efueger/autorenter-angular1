describe('fa.logging > ', function describeImpl() {
  var logService;
  var fakeXhrProvider;
  beforeEach(function beforeEachImpl() {
    fakeXhrProvider = {
      payloadCache: '',
      $get: function getXhr() {
        var self = this;
        return {
          send: function send(payload) {
            self.payloadCache = payload;
          }
        };
      }
    };

    angular.module('fa.logging', ['fa.logging'], function overrideProvider($provide) {
      $provide.provider('xhr', fakeXhrProvider);
    });

    var injector = angular.injector(['fa.logging', 'ng']);
    logService = injector.get('$log');
  });
  it('should post error message to API', function shouldPostToApi() {
    logService.info('logged info!');
    fakeXhrProvider.payloadCache.should.equal('logged info!');
  });
});
