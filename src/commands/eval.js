/*
 * Apresenta a solução de um eval
 */

var _eval = function(bot, data, nick, args, end) {
  'use strict';

  args = args.join(' ');

  if (args.match('process') || args.match('require')) {
    bot.message('Expressão inválida');
    return false;
  }

  bot.message(eval(args));
  end();
};

exports.run = _eval;