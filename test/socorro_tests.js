require('should');

var NICKBOT = require(__dirname + '/../config.json').nick;

var socorro = require('./mocks/exec')('socorro');
var data = require('./mocks/data');

var cleanData = function() {
  data.empty();
};

describe('!socorro', function() {

  before(function() {
    cleanData();
    data.setPath('core.users', [NICKBOT, 'nickpadrao']);
  });

  after(cleanData);

  it('!socorro (sem usuários no canal)', function(done) {
    socorro('', function(output) {
      output.should.contain('nickpadrao, este canal não possui usuários para te ajudar.');
      done();
    });
  });

  it('!socorro (com outros usuários no canal)', function(done) {
    data.setPath('core.users', [NICKBOT, 'nickpadrao', 'bomSamaritano']);
    socorro('', function(output) {
      output.should.contain('bomSamaritano');
      output.should.contain('nickpadrao precisa de ajuda!');
      done();
    });
  });

  it('!socorro (só uma vez por dia)', function(done) {
    socorro('', function(output) {
      output.should.contain('você só pode pedir "socorro" uma vez a cada 24 horas!');
      done();
    });
  });

});