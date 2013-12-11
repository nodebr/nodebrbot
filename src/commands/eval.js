/*
 * Apresenta a solução de um eval
 */

var _eval = function(bot, data, nick, args, end) {
  args = args.join(' ');
  bot.message(eval(args));
  end();
};

exports.run = _eval;