/*
 * Apresenta a descrição e a URL de determinado
 * módulo do npmjs.org
 */

var request = require('request');

var npm = function(bot, data, nick, args, end) {

  var module = args[0];

  if (args.length > 1 || module === '') {
    bot.message('Comando inválido. Exemplo: !npm express');
    return false;
  }

  request('https://registry.npmjs.org/' + module, function(err, headers, body) {
    if (err || headers.statusCode !== 200) {
      bot.message('Erro ao buscar módulo');
      return false;
    }

    try {
      var json = JSON.parse(body);
      bot.message(module + ': ' + json.description);
      bot.message('Para mais informações: https://npmjs.org/package/' + module);
    } catch(err) {
      bot.message('Erro ao buscar módulo');
    }

    end();
  });

};

exports.run = npm;

