var bot = module.parent.exports.bot;
var data = module.parent.exports.data;

var CHANNEL = require(__dirname + '/../../config.json').channel;

bot.addListener('message' + CHANNEL, function(from, message) {
  if (message.charAt(0) !== '!') return;

  var command = message.split(' ')[0].substr(1);
  var args = message.split(' ').slice(1);

  try {
    // callback vazio para fins de testes
    require('./' + command).run(bot, data, args, function() {});
  } catch(err) {
    bot.message('Comando não encontrado :\'(');
    bot.message('Para visualizar a lista de comandos digite: !comandos');
  }
});