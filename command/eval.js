var fork = require('child_process').fork;
var e = require(__dirname + '/../lib/event');
var helper = require(__dirname + '/../lib/helper');

e.on('command.probe.eval', function(callback){
    callback(null, {
        name : 'eval',
        version : '0.0.1',
        description : 'Roda códigos javascript.'
    });
});

e.on('command.exec.eval', function(args, nick, raw){
    var str = raw.substring(6);
    var terminado = false;

    /*
     * Tem que melhorar isso, se ouver uma string com @
     * no meio dela, vai ferrar tudo. Talvez pesquisar na
     * lista de usuários pra ver se o nick existe mesmo...
     */
    if (str.indexOf('@') !== -1) {
        nick = str.slice(str.indexOf('@') + 1);
    }

    /*
     * Evitamos loops infinitos
     */
    var timer = setTimeout(function(){
        helper.say(nick + ', o comando demorou para terminar.');

        try {
            vm.kill();
        } catch (err) {
            // provavelmente a vm já saiu...
        }
    }, 2000);

    /*
     * Enviar apenas uma msg e terminar o que temos pra fazer aqui..
     */
    var terminar = function(msg){
        if(terminado)
            return;

        terminado = true;

        clearTimeout(timer);

        helper.say(msg);
    };

    var vm = fork(__dirname + '/../resource/vm-eval.js');
    vm.on('message', function(msg) {
        if(msg.error)
            terminar(nick + ', ocorreu um erro: ' + msg.error);

        if(msg.result)
            terminar(nick + ', ' + msg.result);
    });

    vm.send(str);
});
