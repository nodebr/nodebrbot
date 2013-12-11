/*
 * Apresenta um Top 5 dos tagarelas do canal
 */

var tagarelas = function(bot, data, nick, args, end) {
  var userMessagesPath = 'core.user_messages';
  var userMessages = data.getPath(userMessagesPath);

  if (typeof userMessages === 'undefined' || userMessages.length === 0) {
    bot.message('Erro ao buscar tagarelas');
    return false;
  }

  var topUsers = Object.keys(userMessages).sort(function(k1, k2) {
    return userMessages[k2] - userMessages[k1];
  });

  if (topUsers.length > 5) {
    topUsers = topUsers.slice(0, 5);
  }

  for (var i = 0; i < topUsers.length; i++) {
    var userNick = topUsers[i];
    var userTotalMessages = userMessages[userNick];
    bot.message((i + 1) + '. ' + userNick + ' (' + userTotalMessages + ' mensagens)');
  }

  end();
};

exports.run = tagarelas;