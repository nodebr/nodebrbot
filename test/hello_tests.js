var should = require('should');

var hello = require('./mocks/exec')('hello');
var valorAuxiliar = require(__dirname + '/../src/commands/hello').valorAuxiliar;

describe('!hello', function() {

  it('!hello', function(done) {
    hello('', 'meunick', function(output) {
      output.should.contain('meunick');
      output.should.contain(valorAuxiliar);
      done();
    });
  });

});