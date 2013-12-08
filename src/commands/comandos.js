/*
 * Apresenta uma lista com todos os comandos existentes
 */

var fs = require('fs');

var commandList = [];

fs.readdirSync(__dirname).forEach(function(file) {
  if (file.match('.js') && !file.match('index')) {
    commandList.push('!' + file.split('.')[0]);
  }
});

var frase = function(bot, data, nick, args, end) {
  bot.message(commandList.join(' '));
  end();
};

exports.run = frase;

exports.commandList = commandList;