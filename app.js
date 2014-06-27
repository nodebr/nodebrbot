var requi = require('requi');

// Inicializando os listeners
requi(__dirname + '/listener');

// Inicializando os comandos
requi(__dirname + '/command');

// Inicializando os serviços
requi(__dirname + '/service');
