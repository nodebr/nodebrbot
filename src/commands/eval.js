/*
 * Executa códigos em uma shell compilada do V8.
 * Par compilar a shell leia o README
 */

var fork = require('child_process').fork;

var _eval = function(bot, data, nick, args, end) {
  var str = args.join(' ');
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
  var timer = setTimeout(function() {
    terminar(nick + ', ocorreu um erro: seu comando demorou muito para terminar.');

    try {
      vm.kill();
    } catch(err){
      // provavelmente a vm já saiu...
    }
  }, 2000);

  /*
   * Enviar apenas uma msg e terminar o que temos pra fazer aqui..
   */
  var terminar = function(msg) {
    if (terminado) return;

    terminado = true;

    clearTimeout(timer);

    bot.message(msg);

    end();
  };

  var vm = fork(__dirname + '/resources/vm_eval.js');
  vm.on('message', function(result){
    terminar(nick + ', ' + result);
  });

  vm.send(str);
};

exports.run = _eval;
