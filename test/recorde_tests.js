var should = require('should');

var recorde = require('./mocks/exec')('recorde');
var data = require('./mocks/data');

var cleanData = function() {
  data.empty();
};

describe('!recorde', function() {

  before(cleanData);
  after(cleanData);

  it('!recorde', function(done) {
    recorde('', function(output) {
      output.should.contain('1');
      done();
    });
  });

  it('!recorde (valor alterado manualmente)', function(done) {
    data.setPath('core.record', {
      value: 10,
      when: new Date()
    });
    recorde('', function(output) {
      output.should.contain('Recorde atual (usuários simultâneos): 10');
      output.should.contain('Registrado em');
      done();
    });
  });

});