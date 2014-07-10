'use strict';
var request = require('request');
var md = require('html-md');
var e = require(__dirname + '/../lib/event');
var helper = require(__dirname + '/../lib/helper');

var TRIM_LIMIT = 100;
exports.TRIM_LIMIT = TRIM_LIMIT;

var HOST = 'http://nodejs.org/api/';

function serializeDoc(mainModule, name, mod) {
    var intro = mod.type + ' ' + name + ' --> ';
    var markdown = md(mod.desc).slice(0, TRIM_LIMIT) + '...';

    // não consegui encontrar uma solução só com regexp que não inserisse um '_'
    // desnecessário quando `mod.textRaw` terminasse em um caractere especial
    // (especialmente, se os últimos dois caracteres forem especiais)
    var section;
    if(mod.textRaw) {
        section = mod.textRaw
            .split(/[^a-zA-Z]+/)
            .filter(function(x) {
              return !!x;
            })
            .join('_')
            .toLowerCase();
    } else section = '';

    var link = HOST + mainModule + '.html#' + mainModule + '_' + section;

    return intro + markdown.replace(/[\n\t]/g, ' ') + ' ' + link;
}

exports.serializeDoc = serializeDoc;

function findWithName(arr, name) {
    var el;
    if(!arr) return;
    for(var i = 0, len = arr.length; i < len; i++) {
        el = arr[i];
        if(el.name === name) return el;
    }
}

exports.findWithName = findWithName;

function dispatch(fns) {
    var len = fns.length;

    return function() {
        var ret;
        for(var i = 0; i < len; i++) {
            ret = fns[i].apply(this, arguments);
            if(ret) return ret;
        }
    };
}

exports.dispatch = dispatch;

function findModule(json, paths, name) {
    var rootNode = (json.modules || json.globals) || {};
    var ret = paths.slice(1).reduce(function(targetModule, path) {
        // Veja M. Fogus "Functional Javascript" capítulo 5
        var find = dispatch([
            findWithName.bind(null, targetModule.modules),
            findWithName.bind(null, targetModule.classes),
            findWithName.bind(null, targetModule.methods),
            findWithName.bind(null, targetModule.properties),
            findWithName.bind(null, targetModule.events),
            findWithName.bind(null, targetModule.globals)
        ]);
        return find(name) || find(path) || targetModule;
    }, rootNode[0]);

    return ret;
}

exports.findModule = findModule;

function doc(args, nick) {
    var name = args._[0];
    if(!name) {
        return helper.say('Comando inválido. Exemplo: !doc http.createServer');
    }
    var paths = name.split('.');
    var mainModule = paths[0];
    var targetLink = HOST + mainModule + '.json';

    request(targetLink, function(err, headers, body) {
        if(err || headers.statusCode !== 200) {
            helper.say('Erro ao buscar a documentação para ' + name);
            return false;
        }

        var json = JSON.parse(body);

        var targetModule = findModule(json, paths, name);

        if(targetModule) {
            var serializedDoc = serializeDoc(mainModule, name, targetModule);

            helper.say(nick + ', ' + serializedDoc);
        } else {
            helper.say('A documentação para ' + name + ' não foi ' +
                       'encontrada.');
        }

    });
}

exports.doc = doc;

e.on('command.probe.doc', function(callback) {
    callback(null, {
        name: 'doc',
        version: '0.0.1',
        description: 'Pesquisa por um token na documentação do node.js core.'
    });
});

e.on('command.exec.doc', doc);
