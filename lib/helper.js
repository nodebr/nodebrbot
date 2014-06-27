var e = require(__dirname + '/event');
var config = require(__dirname + '/config');

exports.say = function(msg, to){
    e.emit('bot.message', to ? to :config.irc.channel, msg);
};
