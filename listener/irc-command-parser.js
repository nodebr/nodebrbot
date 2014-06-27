// Faz o parse dos comandos enviados no IRC
var e = require(__dirname + '/../lib/event');
var config = require(__dirname + '/../lib/config');
var shellQuote = require('shell-quote');
var minimist = require('minimist');
var async = require('async');

e.on('irc.message' + config.irc.channel, function(nick, text){
    if(text.indexOf('!') !== 0)
        return;

    var argv = shellQuote.parse(text.substring(1));
    var parsed = minimist(argv.slice(1));

    // Vamos ver se tem alguém escutando por esse comando
    var listeners = e.listeners('command.exec.' + argv[0]);

    if(!listeners || !listeners.length){
        var msg = 'Comando não encontrado. Comandos disponiveis: ';
        async.series(e.listeners('command.probe.*'), function(err, info){
            if(err)
                throw err;

            msg += info.map(function(i){
                return i.name;
            }).join(', ');
        });

        return e.emit('bot.message', config.irc.channel, msg);
    }

    e.emit('command.exec.' + argv[0], parsed, nick, text);
});

