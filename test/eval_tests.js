var should = require('should');

var _eval = require('./mocks/exec')('eval');

describe('!eval', function() {

  it('!eval', function(done) {
    _eval('', function(output) {
      output.should.contain('undefined');
      done();
    });
  });

  it('!eval 2+2', function(done) {
    _eval('2+2', function(output) {
      output.should.contain('4');
      done();
    });
  });

  it('!eval [3,2].sort()', function(done) {
    _eval('[3,2].sort()', function(output) {
      output.should.contain('2,3');
      done();
    });
  });

  it('!eval (function(n1,n2){return n1+n2;})(2,3)', function(done) {
    _eval('(function(n1,n2){return n1+n2;})(2,3)', function(output) {
      output.should.contain('5');
      done();
    });
  });

  it('!eval var foo = function(n){return n * 10;}; foo(1);', function(done) {
    _eval('var foo = function(n){return n * 10;}; foo(1);', function(output) {
      output.should.contain('10');
      done();
    });
  });

  it('!eval process.exit(1);', function(done) {
    _eval('process.exit(1);', function(output) {
      output.should.contain('Expressão inválida');
      done();
    });
  });

  it('!eval require(\'fs\');', function(done) {
    _eval('require(\'fs\');', function(output) {
      output.should.contain('Expressão inválida');
      done();
    });
  });

});