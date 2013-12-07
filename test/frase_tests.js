var should = require('should');

var frase = require('./mocks/exec')('frase');
var quotes = require(__dirname + '/../src/commands/frase').quotes;

describe('!frase', function() {

  it('!frase', function(done) {
    frase('', function(output) {
      quotes.should.contain(output);
      done();
    });
  });

});