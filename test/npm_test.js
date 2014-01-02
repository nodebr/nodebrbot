require('should');

var npm = require('./mocks/exec')('npm');

describe('!npm', function() {

  it('!npm', function(done) {
    npm('', function(output) {
      output.should.contain('Comando inválido. Exemplo: !npm express');
      done();
    });
  });

  it('!npm lorem ipsum', function(done) {
    npm('lorem ipsum', function(output) {
      output.should.contain('Comando inválido. Exemplo: !npm express');
      done();
    });
  });

  it('!npm easy-cache', function(done) {
    npm('easy-cache', function(output) {
      output.should.contain('easy-cache:');
      output.should.contain('Para mais informações: https://npmjs.org/package/easy-cache');
      done();
    });
  });

});