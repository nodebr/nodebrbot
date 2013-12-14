/*
 * Apresenta o maior pico de usuários simultâneos
 * registrado no canal
 */

var moment = require('moment');

var recorde = function(bot, data, nick, args, end) {
  var record = data.getPath('core.record');

  if (typeof record === 'undefined') {
    record = {
      value: 1,
      when: moment().format()
    }
    data.setPath('core.record', record);
  }

  bot.message('Recorde atual (usuários simultâneos): ' + record.value);
  bot.message('Registrado em ' + moment(record.when).format('DD/MM/YYYY HH:mm:ss'));
  end();
};

exports.run = recorde;
