var should = require('should');

var recorde = require('./mocks/exec')('recorde');
var data = require('./mocks/data');

describe('!recorde', function() {

  it('!recorde', function(done) {
    recorde('', function(output) {
      output.should.contain('1');
      done();
    });
  });

  it('!recorde (valor alterado manualmente)', function(done) {
    data.setPath('core.record', 10);
    recorde('', function(output) {
      output.should.contain('10');
      done();
    });
  });

});