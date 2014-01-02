var bot = require('./bot');
var data = require('./data');

bot.setMaxListeners(500);

var commandsPath = __dirname + '/../../src/commands/';

module.exports = function(command) {

  return function(args, nick, done) {

    // caso não seja especificado um nick

    if (typeof done === 'undefined') {
      done = nick;
      nick = 'nickpadrao';
    }

    var output = '';

    bot.on('message', function(message) {
      output += message;
    });

    args = args.split(' ');

    var result = require(commandsPath + command).run(bot, data, nick, args, function() {
      return done(output);
    });

    if (result === false) {
      return done(output);
    }
  };

};
