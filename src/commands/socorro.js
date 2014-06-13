/* jshint maxcomplexity: 7 */

var NICKBOT = require(__dirname + '/../../config.json').nick;

// TODO: Refatorar para mencionar somente usuários que estão online
// Provavelmente criar uma verificação no listener do evento "names" (src/default_listeners.js)

var socorro = function(bot, data, nick, args, end) {
  var usersPath = 'core.users';
  var users = data.getPath(usersPath);

  if (typeof users === 'undefined') return end();

  var socorroUsersPath = 'socorro';
  var socorroUsers = data.getPath(socorroUsersPath);

  if (typeof socorroUsers === 'undefined') {
    socorroUsers = {};
  }

  if (typeof socorroUsers[nick] !== 'undefined') {
    var now = new Date().getTime();
    var then = socorroUsers[nick];
    if ((now - then) < 1000 * 60 * 60 * 24) {
      bot.message(nick + ', você só pode pedir "socorro" uma vez a cada 24 horas!');
      return end();
    }
  }

  users.splice(users.indexOf(nick), 1);
  users.splice(users.indexOf(NICKBOT), 1);

  if (users.length === 0) {
    bot.message(nick + ', este canal não possui usuários para te ajudar. Boa sorte!');
  } else {
    bot.message(users.join(' ') + ', ' + nick + ' precisa de ajuda!');
    socorroUsers[nick] = new Date().getTime();
    data.setPath(socorroUsersPath, socorroUsers);
  }

  end();
};

exports.run = socorro;