// Módulo principal para compartilhar eventos
// do sistema, assim não sujamos o process.
var EventEmitter2 = require('eventemitter2').EventEmitter2;
var e = new EventEmitter2({
    wildcard: true,
    newListener: true,
    maxListeners: Infinity
});

module.exports = e;
