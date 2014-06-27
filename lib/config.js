var xconf = require('xconf')();
xconf.dir(__dirname + '/../config');

module.exports = xconf.get();

