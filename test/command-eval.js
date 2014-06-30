var command = require(__dirname + '/mock/command')('coin');
require('should');

describe('Testes do comando eval', function() {

    it('!coin usuariosemcarteira', function(done) {
        command('!coin usuariosemcarteira', function(output) {
            output.should.contain(' não configurou uma carteira');
            done();
        });
    });

    it('!coin carteira invalida', function(done) {
        command('!coin carteira invalida', function(output) {
            output.should.contain('carteira enviada é inválida');
            done();
        });
    });

    it('!coin carteira 12cNWHgdXBnQU9CtkhzoW6qRtpphREnEdQ', function(done) {
        command('!coin carteira 12cNWHgdXBnQU9CtkhzoW6qRtpphREnEdQ',
            function(output) {
                output.should.contain('foi configurada com sucesso');
                done();
            });
    });

    it('!coin test', function(done) {
        command('!coin test', function(output) {
            output.should.contain('envie os bitcoins para o endereço');
            done();
        });
    });

    it('!coin pedir test', function(done) {
        command('!coin pedir test', function(output) {
            output.should.contain('utilize o comando !coin test para ' +
            'gerar um endereço');

            done();
        });
    });

    it('!coin', function(done) {
        command('!coin', function(output) {
            output.should.contain('configure sua carteira para receber');
            done();
        });
    });

});
