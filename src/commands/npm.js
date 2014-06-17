/*
 * Apresenta a descrição e a URL de determinado
 * módulo do npmjs.org
 */

var request = require('request');

var npm = function(bot, data, nick, args, end) {

  var command = args[0];

  if (args.length < 1 || command === '') {
    bot.message('Comando inválido. Exemplo: !npm show express');
    return false;
  }

  if(command === 'show')
    request('https://registry.npmjs.org/' + args[1], function(err, headers, body) {
      if (err || headers.statusCode !== 200) {
        bot.message('Erro ao buscar módulo');
        return end();
      }

      try {
        var json = JSON.parse(body);
        bot.message(args[1] + ': ' + json.description);
        bot.message('Para mais informações: https://npmjs.org/package/' + args[1]);
      } catch(err) {
        bot.message('Erro ao buscar módulo');
      }

      end();
    });
  else if(['search', 'find', 's', 'f'].indexOf(command) !== -1){
    var encoded = encodeURIComponent(args.slice(1).join(' '));
    request('http://node-modules.com/search.json?q=' + encoded, function(err, res, body){
      if(err){
        console.error(err ? err.stack : res.statusCode + ' status ao procurar.');
        bot.message('Erro ao procurar por módulos');
        return end();
      }

      var packages = JSON.parse(body);
      var response;

      (function loop(index){
        if(index > 1)
          packages.pop();

        response = packages.map(function(pkg){
          return pkg.name + ' ★' + (pkg.stars || 0);
        }).join(', ');

        if(response.length > 512)
          loop(++index);
      })(0);

      bot.message(response);
      end();
    });
  } else {
    bot.message('Comando inválido, utilize !npm search <expressão> ou !npm show <pacote>');
    end();
  }

};

exports.run = npm;

