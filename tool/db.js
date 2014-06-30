// Ferramenta para verificar as entradas no banco
// de dados
var minimist = require('minimist');
var db = require(__dirname + '/../lib/db');
var args = minimist(process.argv.slice(2));
var util = require('util');

db.createReadStream(args)
    .on('data', function(data){
        console.log('#####   ' + data.key);
        console.log('');
        console.log(util.inspect(data.value, {
            showHidden: true,
            depth: 10
        }));
        console.log('');
    })
    .on('error', function(err){
        throw err;
    });
