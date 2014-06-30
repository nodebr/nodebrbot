var e = require(__dirname + '/../../lib/event');
var config = require(__dirname + '/../../lib/config');
require(__dirname + '/../../listener/irc-command-parser');

module.exports = function(name){
    require(__dirname + '/../../command/' + name);

    return function(command, callback){
        var response = '';
        e.on('bot.message', function(to, message){
            response += to + ': ' + message + '\n';
        });

        setTimeout(function(){
            callback(response);
        }, 2500);

        e.emit('irc.message' + config.irc.channel, 'test', command);
    };
};
