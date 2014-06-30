var level = require('levelup')(__dirname + '/../db', {
    valueEncoding: 'json'
});

module.exports = level;
