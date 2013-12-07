var quotes = [
  '"Later equals never" Robert C. Martin (uncle Bob)',
  '"Clean code always looks like it was written by someone who cares" Robert C. Martin (uncle Bob)',
  '"The first rule of functions is that they should be small" Robert C. Martin (uncle Bob)',
  '"Beautiful is better than ugly" Zen of Python',
  '"Errors should never pass silently" Zen of Python',
  '"Simple is better than complex" Zen of Python'
];

var frase = function(bot, data, args, end) {
  var random = Math.floor(Math.random() * quotes.length);
  var randomQuote = quotes[random];

  bot.message(randomQuote);
  end();
};

exports.run = frase;

exports.quotes = quotes;