/*
 * VM para executar os comandos vindos do !eval
 */

var vm = require('vm');

// Esperamos o comando
process.on('message', function(command){

  // Comando recebido, vamos executálo
  var resultado = vm.runInNewContext(command);

  // E retornar para o processo principal.
  process.send(resultado);
  process.exit();
});
