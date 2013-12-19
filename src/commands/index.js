/*
 * ESTE ARQUIVO NÃO É UM COMANDO
 *
 * É o tratamento para todo mensagem enviada
 * no canal
 */

var util = require('util');

var bot = module.parent.exports.bot;
var data = module.parent.exports.data;

var CHANNEL = require(__dirname + '/../../config.json').channel;
var LOGGER = require(__dirname + '/../../config.json').logger;

bot.addListener('message' + CHANNEL, function(from, message) {

  if (LOGGER) {
    util.log(from + ': ' + message);
  }

  if (message.charAt(0) !== '!') {
    return;
  }

  var command = message.split(' ')[0].substr(1);
  var args = message.split(' ').slice(1);

  try {
    // callback vazio para fins de testes
    require('./' + command).run(bot, data, from, args, function() {});
  } catch(err) {
    if (LOGGER) {
      util.log('Erro ao excutar comando', err);
    }
    bot.message('Comando não encontrado :\'(');
    bot.message('Para visualizar a lista completa de comandos digite: !comandos');
  }

});
