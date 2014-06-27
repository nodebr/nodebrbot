var level = require('level')(__dirname + '/../db', {
    valueEncoding: 'json'
});

module.exports = level;
