require('should');

var gif = require('./mocks/exec')('gif');

describe('!gif', function() {

  it('!gif', function(done) {
    gif('', function(output) {
      console.log(output);
      done();
    });
  });

});
