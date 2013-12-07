var bot = module.parent.exports.bot;
var data = module.parent.exports.data;

var NICK = require(__dirname + '/../config.json').nick;
var CHANNEL = require(__dirname + '/../config.json').channel;

/*
 * Alimenta um contador de mensagens para cada usuário
 */

bot.addListener('message' + CHANNEL, function(from, message) {
  var userMessagesPath = 'core.user_messages.' + from;
  var userMessages = data.getPath(userMessagesPath);

  if (typeof userMessages === 'undefined') {
    userMessages = 1;
  } else {
    userMessages++;
  }

  data.setPath(userMessagesPath, userMessages);
});

/*
 * Registra/atualiza o pico de usuários do canal
 */

bot.addListener('names' + CHANNEL, function(nicks) {
  var recordPath = 'core.record';
  var record = data.getPath(recordPath);

  if (typeof record === 'undefined' || Object.keys(nicks).length > record) {
    record = Object.keys(nicks).length;
    data.setPath(recordPath, record);
    bot.message('Batemos um novo recorde: ' + record + ' usuários simultâneos!');
  }
});

/*
 * Boas vindas a novos usuários
 */

bot.addListener('join' + CHANNEL, function(nick) {
  var usersPath = 'core.users';
  var users = data.getPath(usersPath);

  if (typeof users === 'undefined') {
    users = [NICK];
    data.setPath(usersPath, users);
  }

  if (users.indexOf(nick) === -1) {
    users.push(nick);
    data.setPath(usersPath, users);
    bot.message(nick + ', notei que é novo no canal, seja bem vindo :)');
  }
  bot.send('NAMES', CHANNEL);
});

/*
 * Handler de exceções não capturadas
 */

bot.addListener('error', function() {
  console.log('Internal Error');
});

/*
 * Método para simplificar o envio de mensagens
 */

bot.message = function(message) {
  bot.say(CHANNEL, message);
}