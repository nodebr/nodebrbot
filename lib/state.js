// Guardar estados da aplicação de forma global
var e = require(__dirname + '/event');
var states = {};

exports.get = function(key){
    e.emit('state.get', key);
    e.emit('state.get.' + key, key);

    return states[key];
};

exports.set = function(key, value){
    e.emit('state.set', key, value);
    e.emit('state.set.' + key, value);

    states[key] = value;
};

exports.del = function(key){
    e.emit('state.del', key);
    e.emit('state.del.' + key);

    delete states[key];
};
