var irc = require('irc');
var ev = require(__dirname + '/../lib/event');
var state = require(__dirname + '/../lib/state');
var config = require(__dirname + '/../lib/config');

var bot = new irc.Client(config.irc.server, config.irc.nick, {
    channels: [config.irc.channel]
});

// Monkeypatch do emissor de eventos
var oldEmitter = bot.emit;
bot.emit = function(){
    var args = Array.prototype.slice.call(arguments, 0);

    ev.emit.apply(ev, [].concat(['irc.' + args[0]], args.slice(1)));
    oldEmitter.apply(bot, args);
};

bot.addListener('error', function (err) {
    throw new Error(err.command);
});

// Escutamos por eventos para mandar mensagens usando o bot
ev.on('bot.message', function(to, msg){
    if(state.get('bot.online'))
        bot.say(to, msg);
});

