/*
 * VM para executar os comandos vindos do !eval
 */

var vm = require('vm');

// Esperamos o comando
process.on('message', function(command){
    var error;
    var resultado;

    // Comando recebido, vamos executálo
    try {
        resultado = vm.runInNewContext(command);
    } catch(err){
        error = err;
    }

    // E retornar para o processo principal.
    if(!error)
        process.send({
            result : resultado
        });
    else
        process.send({
            error : error.message
        });

    process.exit();
});
