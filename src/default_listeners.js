var moment = require('moment');

var bot = module.parent.exports.bot;
var data = module.parent.exports.data;

var CHANNEL = require(__dirname + '/../config.json').channel;

/*
 * Alimenta um contador de mensagens para cada usuário
 */

bot.addListener('message' + CHANNEL, function(from) {
  var userMessagesPath = 'core.user_messages';
  var userMessages = data.getPath(userMessagesPath);

  if (typeof userMessages === 'undefined') {
    userMessages = {};
  }

  if (typeof userMessages[from] === 'undefined') {
    userMessages[from] = 1;
  } else {
    userMessages[from]++;
  }

  data.setPath(userMessagesPath, userMessages);
});

/*
 * Registra/atualiza o pico de usuários do canal
 */

bot.addListener('names' + CHANNEL, function(nicks) {
  var usersPath = 'core.users';
  var users = data.getPath(usersPath);

  if (typeof users === 'undefined' || users.length === 1) {
    users = Object.keys(nicks);
    data.setPath(usersPath, users);
  }

  var recordPath = 'core.record';
  var record = data.getPath(recordPath);

  if (typeof record === 'undefined' || Object.keys(nicks).length > record.value) {
    record = {
      value: Object.keys(nicks).length,
      when: moment().format()
    };
    data.setPath(recordPath, record);
    bot.message('Batemos um novo recorde: ' + record.value + ' usuários simultâneos!');
  }
});

/*
 * Boas vindas a novos usuários
 */

bot.addListener('join' + CHANNEL, function(nick) {
  var usersPath = 'core.users';
  var users = data.getPath(usersPath);

  if (typeof users === 'undefined') {
    users = [nick];
    data.setPath(usersPath, users);
  }

  if (users.indexOf(nick) === -1) {
    users.push(nick);
    data.setPath(usersPath, users);
    bot.message(nick + ', notei que é novo no canal, seja bem vindo :)');
  }

  // dispara o evento acima ('names' + CHANNEL)
  // para atualizar o recorde se necessário

  bot.send('NAMES', CHANNEL);
});

/*
 * Handler de exceções não capturadas
 */

bot.addListener('error', function(err) {
  throw err;
});

/*
 * Método para simplificar o envio de mensagens
 */

bot.message = function(message) {
  bot.say(CHANNEL, message);
};
