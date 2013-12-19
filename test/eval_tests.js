var should = require('should');

var _eval = require('./mocks/exec')('eval');

describe('!eval', function() {

  it('!eval', function(done) {
    _eval('Math.pow(5, 4)', function(output) {
      output.should.contain(625);
      done();
    });
  });

});
