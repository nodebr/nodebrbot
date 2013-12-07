var events = require('events');

var bot = module.exports = new events.EventEmitter();

bot.message = function(message) {
  bot.emit('message', message);
};