var should = require('should');

var hn = require('./mocks/exec')('hn');

describe('!hn', function() {

  it('!hn', function(done) {
    hn('', function(output) {
      output.should.contain('Comando inválido. Exemplos: !hn top | !hn random');
      done();
    });
  });

  it('!hn lorem ipsum', function(done) {
    hn('lorem ipsum', function(output) {
      output.should.contain('Comando inválido. Exemplos: !hn top | !hn random');
      done();
    });
  });

  it('!hn top', function(done) {
    hn('top', function(output) {
      output.should.contain('HN:');
      output.should.contain('Pontos');
      output.should.contain('Comentários');
      done();
    });
  });

  it('!hn random', function(done) {
    hn('random', function(output) {
      output.should.contain('HN:');
      output.should.contain('Pontos');
      output.should.contain('Comentários');
      done();
    });
  });

});