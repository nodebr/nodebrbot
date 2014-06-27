// Dispara mensagens de boas vindas assim que conecta ao IRC
var e = require(__dirname + '/../lib/event');
var config = require(__dirname + '/../lib/config');
var pkg = require(__dirname + '/../package.json');
var state = require(__dirname + '/../lib/state');
var irc = require('irc');

e.on('irc.join', function(channel, nick){

    // Somente quando nós mesmos entramos
    if(channel !== config.irc.channel || nick !== config.irc.nick)
        return;

    state.set('bot.online', true);

    var msg = ' Bot de interação conectado neste canal. Versão v' + pkg.version;
    var warning = irc.colors.wrap('light_red', '[ATENÇÃO]');

    e.emit('bot.message', config.irc.channel,  warning + msg);
});
