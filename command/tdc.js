// Comando temporário para cadastrar e-mails dos interessados
// em participar do TDC

var e = require(__dirname + '/../lib/event');
var helper = require(__dirname + '/../lib/helper');
var db = require(__dirname + '/../lib/db');
/* jshint -W101 */
var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* jshint +W101 */
var Puid = require('puid');
var puid = new Puid();

e.on('command.probe.tdc', function(callback){
    callback(null, {
        name : 'tdc',
        version : '0.0.1',
        description : 'Guara o e-mail para concorrer no TDC.'
    });
});

e.on('command.exec.tdc', function(args, nick){
    var emails = args._;

    if(!regex.test(emails[0]) || !regex.test(emails[1]))
        return helper.say(nick + ', o e-mail digitado ou a confirmação são ' +
        'inválidos, tente !tdc seu@email seu@email');

    if(emails[0] !== emails[1])
        return helper.say(nick + ', o e-mail digitado ou a confirmação não ' +
        'coincidem, tente !tdc seu@email.com seu@email.com');

    db.put('tdc::' + puid.generate(), emails[0], function(err){
        if(err)
            throw err;

        helper.say(nick + ', seu e-mail foi cadastrado com sucesso, aguarde ' +
        'sorteio, você será notificado por e-mail.');
    });

});
