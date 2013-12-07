var should = require('should');

var comandos = require('./mocks/exec')('comandos');
var commandList = require(__dirname + '/../src/commands/comandos').commandList;

describe('!comandos', function() {

  it('!comandos', function(done) {
    comandos('', function(output) {
      output.should.be.equal(commandList.join(' '));
      done();
    });
  });

});