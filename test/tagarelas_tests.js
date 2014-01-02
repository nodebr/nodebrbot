require('should');

var data = require('./mocks/data');
var tagarelas = require('./mocks/exec')('tagarelas');

var someUsers = {
  foo: 100,
  lorem: 50,
  bar: 70
};

var lotsOfUsers = {
  foo: 100,
  lorem: 50,
  bar: 70,
  ipsum: 200,
  dolor: 30,
  sit: 400,
  amet: 120
};

var cleanData = function() {
  data.empty();
};

describe('!tagarelas', function() {

  before(cleanData);
  after(cleanData);

  it('!tagarelas (nenhum usuário)', function(done) {
    tagarelas('', function(output) {
      output.should.contain('Erro ao buscar tagarelas');
      done();
    });
  });

  it('!tagarelas (menos que 5 usuários)', function(done) {
    data.setPath('core.user_messages', someUsers);
    tagarelas('', function(output) {
      output.should.contain('1. foo (100 mensagens)');
      output.should.contain('2. bar (70 mensagens)');
      output.should.contain('3. lorem (50 mensagens)');
      done();
    });
  });

  it('!tagarelas (mais que 5 usuários)', function(done) {
    data.setPath('core.user_messages', lotsOfUsers);
    tagarelas('', function(output) {
      output.should.contain('1. sit (400 mensagens)');
      output.should.contain('2. ipsum (200 mensagens)');
      output.should.contain('3. amet (120 mensagens)');
      output.should.contain('4. foo (100 mensagens)');
      output.should.contain('5. bar (70 mensagens)');
      output.should.not.contain('6');
      done();
    });
  });

});