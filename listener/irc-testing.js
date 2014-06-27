// Arquivo usado para testes
var e = require(__dirname + '/../lib/event');

e.on('state.set.bot.online', function(){
    e.emit('irc.getWhois', 'alanhoff', function(){
        console.log(arguments);
    });
});
