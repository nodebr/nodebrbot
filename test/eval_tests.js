require('should');

var _eval = require('./mocks/exec')('eval');

describe('!eval', function() {

  it('!eval Math.pow(5, 4)', function(done) {
    _eval('Math.pow(5, 4)', function(output) {
      output.should.contain(625);
      done();
    });
  });

  it('!eval while(true){}', function(done) {
    _eval('while(true){}', function(output) {
      output.should.contain('demorou muito para terminar');
      done();
    });
  });

  it('!eval var soma=function(n1,n2){return n1+n2;};soma(2,3);', function(done) {
    _eval('var soma=function(n1,n2){return n1+n2;};soma(2,3);', function(output) {
      output.should.contain(5);
      done();
    });
  });

});