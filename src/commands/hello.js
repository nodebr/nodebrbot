/*
 * Este comando é apenas um exemplo de como um comando
 * deve ser estruturado.
 *
 * IMPORTANTE: Todo comando deve ter um arquivo de teste
 * correspondente.
 * Vide diretório test/ na raiz para referência.
 */

/*
 * Caso o comando dependa de algum(ns) módulo(s)
 * esta é a hora de importá-lo(s).
 *
 * Exemplo:
 *
 * var cache = require('easy-cache');
 */

/*
 * Variáveis auxiliares também podem ser utilizadas.
 */

var valorAuxiliar = 'Hello world';

/*
 * IMPORTANTE: O nome do comando deve ser o mesmo
 * do arquivo criado para o mesmo.
 *
 * IMPORTANTE: Todos os comandos possuem a mesma
 * assinatura de função, sendo os parâmetros:
 *
 *    bot: a instância do robô (utilizada para 
 *         enviar mensagens basicamente)
 *
 *   data: a instância do "cubby" (módulo utilizado
 *         para persistência em JSON).
 *         https://github.com/icodeforlove/node-cubby
 *
 *   args: array de argumentos com os quais o comando
 *         foi chamado.
 *         Este comando, por exemplo: !hello lorem ipsum
 *         Irá receber como "args": ['lorem', 'ipsum']
 *
 *   nick: nick do usuário que disparou o comando
 *
 *    end: IMPORTANTE! Callback que DEVE ser chamado
 *         no final do comando. (para fins de testes)
 *
 * IMPORTANTE: Para fins de testes, o comando só termina
 * quando o callback "end" é chamado, ou quando retorna false.
 */

var hello = function(bot, data, nick, args, end) {
  bot.message(nick + ', ' + valorAuxiliar);
  end();
};

/*
 * As exportações do módulo devem ficar ao final do arquivo.
 *
 * IMPORTANTE: O comando em si deve ser exportado como "run".
 * Variáveis auxiliares também devem ser exportadas para fins de testes.
 */

exports.run = hello;

exports.valorAuxiliar = valorAuxiliar;
