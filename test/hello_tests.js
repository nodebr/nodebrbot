var should = require('should');

var hello = require('./mocks/exec')('hello');
var valorAuxiliar = require(__dirname + '/../src/commands/hello').valorAuxiliar;

describe('!hello', function() {

  it('!hello', function(done) {
    hello('', function(output) {
      output.should.be.equal(valorAuxiliar);
      done();
    });
  });

});