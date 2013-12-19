/*
 * Executa códigos em uma shell compilada do V8.
 * Par compilar a shell leia o README
 */

var spawn = require('child_process').spawn;
var config = require('../../config.json');

exports.run = function(bot, data, nick, args, end){
  var v8 = spawn(config.shell);
  var str = args.join(' ');
  var terminado = false;

  /*
   * Tem que melhorar isso, se ouver uma string com @
   * no meio dela, vai ferrar tudo. Talvez pesquisar na
   * lista de usuários pra ver se o nick existe mesmo...
   */
  if(str.indexOf('@') !== -1){
    nick = str.slice(str.indexOf('@') + 1);
  }

  /*
   * Evitamos loops infinitos
   */
  var timer = setTimeout(function(){
    terminar(nick + ', ocorreu um erro: seu comando demorou muito para terminar.');
  }, 2000);

  /*
   * Enviar apenas uma msg e terminar o que temos pra fazer aqui..
   */
  var terminar = function(msg){
    if(terminado)
      return;

    terminado = true;

    clearTimeout(timer);
    bot.message(msg);
    v8.kill();
    end();
  };

  /*
   * Escutando por erros do shell. Infelizmente alguns outputs também
   * estão sendo redirecionados para o stderr, por isso temos que filtrar..
   */
  v8.stderr.setEncoding('utf8');
  v8.stderr.on('data', function(data){
    if(data.indexOf('V8 version') === -1 && data.charAt(0) !== '>')
      terminar(nick + ', ' + data.replace('(shell):1: ', ''));
  });

  /*
   * Resposta quando deu tudo certo...
   */
  v8.stdout.setEncoding('utf8');
  v8.stdout.on('data', function(data){
    terminar(nick + ', ' + data);
  });

  /*
   * Escreve o comando inteiro do usuário e finaliza o stdin para que
   * o shell interprete o código.
   */
  v8.stdin.write(str);
  v8.stdin.end();
};
