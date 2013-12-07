var bot = require('./bot');
var data = require('./data');

var commandsPath = __dirname + '/../../src/commands/';

module.exports = function(command) {

  return function(args, done) {
    var output = '';
    bot.on('message', function(message) {
      output += message;
    });

    args = args.split(' ');

    var result = require(commandsPath + command).run(bot, data, args, function() {
      return done(output);
    });

    if (result === false) {
      return done(output);
    }
  };

};