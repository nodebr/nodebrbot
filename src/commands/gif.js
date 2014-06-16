/* jshint camelcase: false */

/*
 *  Mostra um gif baseado na palavra chave
 *  atraves da busca na API do giphy
 */

var request = require('request');
var gif = function(bot, data, nick, args, end) {
  var module = encodeURIComponent(args.join('+'));
  if (module.trim() === '') {
    request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC',
      function(err, headers, body) {
        if (err || headers.statusCode !== 200) {
          bot.message('Erro ao buscar gif');
          return false;
        }
        try {
          var json = JSON.parse(body);
          bot.message(json.data.image_original_url);
        } catch(err) {
          bot.message('Erro ao buscar gif');
        }

        end();
      });
  }

  if (args.length >= 1) {

    request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + module,
      function(err, headers, body) {
        if (err || headers.statusCode !== 200) {
          bot.message('Erro ao buscar gif');
          return false;
        }
        try {
          var json = JSON.parse(body);

          if(json.data.image_original_url){
            bot.message(json.data.image_original_url);
          }else{
            bot.message('Não encontramos o gif desejado :( ');
          }
        } catch(err) {
          bot.message('Erro ao buscar gif');
        }

        end();
      });
  }
};

exports.run = gif;
