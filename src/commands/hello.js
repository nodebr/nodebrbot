/*
 * Este comando é apenas um exemplo de como deve ser
 * a estrutura de um comando.
 *
 * IMPORTANTE: Todo comando deve ter um arquivo de test.
 * Vide diretório test/ na raiz para referência.
 */

/*
 * Caso o comando dependa de algum(ns) módulo(s)
 * agora é a hora para importá-lo(s).
 *
 * Exemplo:
 *
 * var cache = require('easy-cache');
 */

/*
 * Variáveis auxiliares também podem ser utilizadas.
 * 
 * Vamos usar uma neste exemplo:
 */

var valorAuxiliar = 'Hello world';

/*
 * Próximo passo é escolher um nome para o comando.
 * (Que não está sendo utilizado é claro)
 *
 * O nome deve ser tudo minúsculo, sem espaços ou
 * caracteres especiais. (vamos manter simples :O)
 *
 * IMPORTANTE: O nome do comando deve ser o mesmo
 * do arquivo criado para o mesmo.
 *
 * IMPORTANTE: Todos os comandos possuem a mesma
 * assinatura, sendo os parâmetros:
 *
 *   bot: a instância do robô (utilizada para 
 *        enviar mensagens basicamente)
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
 *   end: IMPORTANTE! Callback que DEVE ser chamado
 *        no final do comando. (os testes dependem disso)
 *
 * IMPORTANTE: Para fins de testes, o comando só termina
 * quando o callback "end" é chamado, ou quando retorna false.
 */

var hello = function(bot, data, args, end) {
  bot.message(valorAuxiliar);
  end();
};

/*
 * Abaixo devem ficar as exportações do comando.
 *
 * IMPORTANTE: O comando em si deve ser exportado como "run".
 * Se houver valores auxiliares, devem ser exportados com o
 * mesmo nome, para que os testes possam utilizar se necessário.
 */

exports.run = hello;

exports.valorAuxiliar = valorAuxiliar;