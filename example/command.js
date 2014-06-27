// Primeiramente é necessário carregar os módulos necessários
var e = require(__dirname + '/../lib/event');
// O helper não é necessário, mas ajuda a minimizar o código
var helper = require(__dirname + '/../lib/event');

// Precisamos escutar pelo evento command.probe.seu_comando
// para responder com as iformações sobre o módulos e para
// que o mesmo seja listado na lista de comandos
e.on('command.probe.hello', function(callback){

    // Podemos fazer qualquer operação assíncrona aqui
    // depois precisamos chamar o callback para responde
    // com nossas informações
    var info = {
        name : 'hello',
        version : '0.0.1',
        description : 'Comando para testes.'
    };

    // Respondemos o primeiro parâmetro como null para
    // dizer que não ouve erros e o segundo comando o
    // nome do nosso módulo.
    callback(null, info);
});

// Quando o usuário executar o comando, o evento command.exec.seu_comando
// Será disparado, portanto precisamos escutar por ele
e.on('command.exec.hello', function(args, nick, raw){

    // Aqui recebemos os argumentos (args) em forma de objetos, que foram
    // parseados pelo módulo minimist
    // https://github.com/substack/minimist
    console.log('Argumentos recebidos:', args);

    // O nick é referemte ao usuário que está executando o comando
    console.log('Usuário que executou o comando:', nick);

    // O raw refe-se ao comando inteiro no formato string
    // sem nenhum tipo de parse
    console.log('Comando sem parse:', raw);

    // Quando achar necessário responder, você só precisa emitir o evento
    // bot.message, como neste exemplo
    e.emit('bot.message', '#canal_conectado', 'O comando hello foi executado.');
    // Ou diretamente para a pessoa que executou o comando
    e.emit('bot.message', nick, 'Você executou o comando hello.');

    // Também pode utilizar o helper para isso, o comando
    // say envia a mensagem automaticamente para o canal configurado
    // em config/default.json
    helper.say('Estou dizendo com o helper');
    // Ou para um usuário ou outro canal
    helper.say('Estou falando diretamente com você', nick);
});

