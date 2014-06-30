var e = require(__dirname + '/../lib/event');
var config = require(__dirname + '/../lib/config');
var express = require('express');
var app = express();

app.all('/api/v1/:module', function(req, res, next){
    var method = req.method.toLowerCase();
    var listeners = e.listeners('http.v1.' + method + '.' + req.params.module);

    if(!listeners || !listeners.length)
        return next();

    e.emit('http.v1.' + method + '.' + req.params.module, req, res, next);
});

app.all('*', function(req, res){
    res.send(404, 'Rota não encontrada.');
});

app.listen(config.http.port);
