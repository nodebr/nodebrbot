var command = require(__dirname + '/mock/command')('npm');
require('should');

describe('Testes do comando npm', function () {

    it('!npm', function (done) {
        command('!npm', function (output) {
            output.should.contain('Comando inválido');
            done();
        });
    });

    it('!npm lorem ipsum', function (done) {
        command('!npm lorem ipsum', function (output) {
            output.should.contain('Comando inválido, utilize !npm search');
            done();
        });
    });

    it('!npm show easy-cache', function (done) {
        command('!npm show easy-cache', function (output) {
            output.should.contain('easy-cache:');

            var info = 'Link: ' +
            'https://npmjs.org/package/easy-cache';

            output.should.contain(info);
            done();
        });
    });

    it('!npm search express', function (done) {
        command('!npm search express', function (output) {
            output.should.contain('express');
            output.should.contain('★');
            done();
        });
    });

});
