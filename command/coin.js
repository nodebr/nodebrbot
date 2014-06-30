// TODO: Fazer um serviço de http para capturarmos o callback
// das tranações de bitocoin e mostrar no canal

var e = require(__dirname + '/../lib/event');
var config = require(__dirname + '/../lib/config');
var helper = require(__dirname + '/../lib/helper');
var request = require('request');
var address = require('bitcoin-address');
var db = require(__dirname + '/../lib/db');
var Puid = require('puid');
var puid = new Puid();

e.on('command.probe.coin', function(callback){

    var info = {
        name : 'coin',
        version : '0.0.1',
        description : 'Envie bitcoins para pessoas que ajudaram você.'
    };

    callback(null, info);
});


e.on('command.exec.coin', function(args, nick){

    if(args._ && args._[0] && args._[1] && args._[0].toLowerCase() === 'pedir'){
        return helper.say(args._[1] + ', você pode doar bitcoins para o ' +
        'usuário ' + nick + ' se este foi prestativo, utilize o comando ' +
        '!coin ' + nick + ' para gerar um endereço de doação.');
    }

    // Quando alguem quiser configurar a sua wallet
    if(args._ && args._[0] && args._[0].toLowerCase() === 'carteira'){
        if(!address.validate(args._[1]))
            return helper.say(nick + ', a carteira enviada é inválida.');

        db.put('wallet::' + nick, args._[1], function(err){
            if(err)
                throw err;

            helper.say(nick + ', sua carteira foi configurada com sucesso.');
        });

        return;
    }

    // Quando quiserem enviar uma doação
    if(args._ && args._[0]){

        db.get('wallet::' + args._[0], function(err, wallet){
            if(err && !err.notFound)
                throw err;

            if(!wallet){
                var text = 'Você não pode fazer doações para ' + args._[0] +
                ' ' + 'pois ele ainda não configurou uma carteira.';

                return helper.say(text);
            }

            var donation = puid.generate();
            var callback = encodeURIComponent(config.http.url +
            '/api/v1/blockchain?secret=' + config.blockchain.secret + '&' +
            'donation=' + donation);

            var url = '/api/receive?method=create&cors=true&format=plain&' +
            'address=' + wallet + '&shared=false&' +
            'callback=' + callback;

            request('https://blockchain.info/' + url, function(err, res, body){
                if(err)
                    console.error(err.stack);

                if(err || res.statusCode !== 200)
                    return helper.say('Não foi possível criar a carteira ' +
                    'para enviar a doação, tente mais tarde.');

                var json = JSON.parse(body);
                var donation = {
                    from : nick,
                    to : args._[0],
                    date : new Date()
                };

                db.put('donation::' + donation, donation,
                    function(err){
                        if(err)
                            throw err;

                        helper.say('Para enviar uma doação para o usuário ' +
                        args._[0] + ' envie os bitcoins para o endereço ' +
                        json.input_address);
                    });
            });

        });

        return;
    }

    helper.say(nick + ', configure sua carteira para receber doações usando' +
    ' o comando !coin carteira sua_carteira ou envie uma doação usando o ' +
    'comando !coin usuario. Peça doações usando !coin pedir usuario.');
});

// Escutamos pelos pagamentos do blockchain
e.on('http.v1.get.blockchain', function(req, res){
    if(req.query.secret !== config.blockchain.secret)
        return res.send(401, 'Wront secret.');

    if(Number(req.query.confirmations) > 0)
        return res.send(200);

    db.get('donation::' + req.query.donation, function(err, donation){
        if(err && !err.notFound)
            throw err;

        if(err && err.notFound)
            return res.send(200);

        var btc = Number(req.query.value) / 100000000;
        helper.say('[Doação] O usuário ' + donation.from + ' acabou de doar ' +
        btc + 'BTC para ' + donation.to);

        res.send(200);
    });
});
