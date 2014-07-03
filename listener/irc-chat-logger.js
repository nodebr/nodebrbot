var e = require(__dirname + '/../lib/event');
var db = require(__dirname + '/../lib/db');
var config = require(__dirname + '/../lib/config');
var moment = require('moment');
var async = require('async');

// Uma fila para não afogar o processo quando
// tivermos muitas mensagens vindo ao mesmo tempo
var queue = async.queue(function(msg, callback){

    // Data de hoje
    var date = moment().format('YYYY-DD-MM');

    // Verificamos se já existe logs gravados nesta data
    db.get('chat::' + date, function(err, log){
        if(err && !err.notFound)
            throw err;

        // Se não existir criamos uma array vazia
        if(err && err.notFound)
            log = [];

        // Enviamos a nova conversa para a array
        // de conversas
        log.push(msg);

        // Guardamos no banco de dados
        db.put('chat::' + date, log, function(err){
            if(err)
                throw err;

            callback();
        });
    });

}, 1);

e.on('irc.message' + config.irc.channel, function(nick, text){
    queue.push({
        nick : nick,
        text : text,
        date : new Date()
    });
});


e.on('http.v1.get.chat', function(req, res){
    var date = req.query.date || moment().format('YYYY-DD-MM');

    db.get('chat::' + date, function(err, log){
        if(err && !err.notFound)
            throw err;

        if(err && err.notFound)
            log = [];

        res.json(log);
    });
});
