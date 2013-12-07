var scrap = require('scrap');

var npm = function(bot, data, args, end) {

  var module = args[0];

  if (args.length > 1 || module === '') {
    bot.message('Comando inválido. Exemplo: !npm express');
    return false;
  }

  scrap('https://npmjs.org/package/' + module, function(err, $) {
    if (err) {
      bot.message('Erro ao buscar módulo');
      return false;
    }

    try {
      bot.message(module + ': ' + $('p.description').html());
      bot.message('Para mais informações: https://npmjs.org/package/' + module);
    } catch(err) {
      bot.message('Erro ao buscar módulo');
    }

    end();
  });

};

exports.run = npm;