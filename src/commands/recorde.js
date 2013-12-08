/*
 * Apresenta o maior pico de usuários simultâneos
 * registrado no canal
 */

var recorde = function(bot, data, nick, args, end) {
  var record = data.getPath('core.record');

  if (typeof record === 'undefined') {
    record = 1;
    data.setPath('core.record', record);
  }

  bot.message('Recorde atual (usuários simultâneos): ' + record);
  end();
};

exports.run = recorde;