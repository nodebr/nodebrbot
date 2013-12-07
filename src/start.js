var irc = require('irc');
var Cubby = require('cubby');

var SERVER = require(__dirname + '/../config.json').server;
var NICK = require(__dirname + '/../config.json').nick;
var CHANNEL = require(__dirname + '/../config.json').channel;

exports.data = new Cubby({file: __dirname + '/../data.json'});
exports.bot = new irc.Client(SERVER, NICK, {channels: [CHANNEL]});

require('./default_listeners');
require('./commands');