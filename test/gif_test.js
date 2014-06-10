require('should');

var npm = require('./mocks/exec')('gif');

describe('!gif', function() {

  it('!gif', function(done) {
    npm('', function(output) {
      output.should.contain('Comando inválido. Exemplo: !gif cat');
      done();
    });
  });


});
