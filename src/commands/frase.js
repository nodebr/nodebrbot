/*
 * Apresenta uma frase aleatória com base na lista
 * de frases (quotes)
 */

var quotes = require('./resources/quotes.json');

var frase = function(bot, data, nick, args, end) {
  var random = Math.floor(Math.random() * quotes.length);
  var randomQuote = quotes[random];

  bot.message(randomQuote);
  end();
};

exports.run = frase;

exports.quotes = quotes;