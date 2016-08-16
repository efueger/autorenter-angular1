describe('fa.logging > ', function describeImpl() {
  var $log;
  var fakeXhrProvider;
  beforeEach(function beforeEachImpl() {
    fakeXhrProvider = {
      payloadCache: '',
      $get: function getXhr() {
        console.log('in getXhr()!!!');
        var self = this;
        return {
          send: function send(payload) {
            self.payloadCache = payload;
          }
        };
      }
    };

    angular.module('fa.logging', ['ng'], function overrideProvider($provide) {
      $provide.provider('xhr', fakeXhrProvider);
    });
  });

  beforeEach(inject(function(_$log_) {
    $log = _$log_;
  }));

  it('should post error message to API', function shouldPostToApi() {
    $log.info('logged info!');
    console.log('the log info array = ' + JSON.stringify($log.info.logs));
    console.log('payload = ' + fakeXhrProvider.payloadCache);
    // fakeXhrProvider.payloadCache.should.equal('logged info!');
  });
});
