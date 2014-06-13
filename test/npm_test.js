require('should');

var npm = require('./mocks/exec')('npm');

describe('!npm', function() {

  it('!npm', function(done) {
    npm('', function(output) {
      output.should.contain('Comando inválido. Exemplo: !npm show express');
      done();
    });
  });

  it('!npm lorem ipsum', function(done) {
    npm('lorem ipsum', function(output) {
      output.should.contain('Comando inválido, utilize !npm search');
      done();
    });
  });

  it('!npm show easy-cache', function(done) {
    npm('show easy-cache', function(output) {
      output.should.contain('easy-cache:');
      output.should.contain('Para mais informações: https://npmjs.org/package/easy-cache');
      done();
    });
  });

  it('!npm search express', function(done) {
    npm('search express', function(output) {
      output.should.contain('express');
      output.should.contain('★');
      done();
    });
  });

});
