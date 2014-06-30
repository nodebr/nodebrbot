var command = require(__dirname + '/mock/command')('eval');
require('should');

describe('Testes do comando eval', function () {

    it('!eval Math.pow(5, 4)', function (done) {
        command('!eval Math.pow(5, 4)', function (output) {
            output.should.contain(625);
            done();
        });
    });

    it('!eval while(true){}', function (done) {
        command('!eval while(true){}', function (output) {
            output.should.contain('o comando demorou para terminar');
            done();
        });
    });

    it('!eval var soma=function(n1,n2){return n1+n2;};soma(2,3);',
        function (done) {
            command('!eval var soma=function(n1,n2){return n1+n2;};soma(2,3);',
                function (output) {
                    output.should.contain(5);
                    done();
                });
        });

    it('!eval (typeof window) + (typeof require) + (typeof process);',
        function (done) {
            command('!eval (typeof window) + (typeof require)' +
            ' + (typeof process);',
                function (output) {
                    output.should.contain('undefinedundefinedundefined');
                    done();
                });
        });

});
