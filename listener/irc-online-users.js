// Atualiza a lista de usuários online
// TODO: ainda não consigo retirar usuários da lista...

var e = require(__dirname + '/../lib/event');
var config = require(__dirname + '/../lib/config');
var state = require(__dirname + '/../lib/state');

e.on('irc.names' + config.irc.channel, function(nicks){
    var names = Object.keys(nicks);
    state.set('irc.names', names);
});

e.on('irc.part' + config.irc.channel, function(nick){
    var names = state.get('irc.names');

    console.log('part', arguments);

    if(!names)
        names = [];

    names.splice(names.indexOf(nick), 1);
    state.set('irc.names', names);
});

e.on('irc.quit' + config.irc.channel, function(nick){
    var names = state.get('irc.names');


    console.log('quit', arguments);

    if(!names)
        names = [];

    names.splice(names.indexOf(nick), 1);
    state.set('irc.names', names);
});

e.on('irc.kick' + config.irc.channel, function(nick){
    var names = state.get('irc.names');


    console.log('kick', arguments);

    if(!names)
        names = [];

    names.splice(names.indexOf(nick), 1);
    state.set('irc.names', names);
});

e.on('irc.kill' + config.irc.channel, function(nick){
    var names = state.get('irc.names');

    console.log('kill', arguments);

    if(!names)
        names = [];

    names.splice(names.indexOf(nick), 1);
    state.set('irc.names', names);
});

e.on('irc.join' + config.irc.channel, function(nick){
    var names = state.get('irc.names');

    if(!names)
        names = [];

    names.push(nick);
    state.set('irc.names', names);
});
