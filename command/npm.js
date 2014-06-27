var e = require(__dirname + '/../lib/event');
var helper = require(__dirname + '/../lib/helper');
var request = require('request');

e.on('command.probe.npm', function(callback){
    callback(null, {
        name : 'npm',
        version : '0.0.1',
        description : 'Utilitário para módulos do npm.'
    });
});

e.on('command.exec.npm', function(args){
    if (!args._|| args._.length < 1 ) {
        return helper.say('Comando inválido. Exemplo: !npm show express');
    }

    var command = args._[0];

    if (command === 'show')
        request('https://registry.npmjs.org/' + args._[1],
            function (err, headers, body) {
                if (err || headers.statusCode !== 200)
                    return helper.say('Erro ao buscar módulo');

                try {
                    var json = JSON.parse(body);
                    helper.say(args._[1] + ': ' + json.description);
                    helper.say('Link: https://npmjs.org/package/' + args[1]);
                } catch (err) {
                    helper.say('Erro ao buscar módulo');
                }
            });
    else if (['search', 'find', 's', 'f'].indexOf(command) !== -1) {
        var encoded = encodeURIComponent(args._.slice(1).join(' '));
        request('http://node-modules.com/search.json?q=' + encoded,
            function (err, res, body) {
                if (err) {
                    helper.say('Erro ao procurar por módulos.');
                }

                var packages = JSON.parse(body);
                var response;

                (function loop(index) {
                    if (index > 1)
                        packages.pop();

                    response = packages.map(function (pkg) {
                        return pkg.name + ' ★' + (pkg.stars || 0);
                    }).join(', ');

                    if (response.length > 512)
                        loop(++index);
                })(0);

                helper.say(response);
            });
    } else {
        var msg = 'Comando inválido, utilize ' +
        '!npm search <expressão> ou !npm show <pacote>';

        helper.say(msg);
    }
});
