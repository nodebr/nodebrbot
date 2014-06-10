require('should');

var gif = require('./mocks/exec')('gif');

describe('!gif', function() {

  it('!gif', function(done) {
    gif('', function(output) {
      output.should.contain('Comando inválido. Exemplo: !gif cat');
      done();
    });
  });


});
