# nodebrbot [![Build Status](https://secure.travis-ci.org/zonetti/nodebrbot.png)](http://travis-ci.org/zonetti/nodebrbot)

Um robô para o canal #nodebr na Freenode.

## Comandos atuais

* !comandos (Exibe uma lista com todos os comandos existentes)

* !eval <comando> (Executa o comando dentro da V8 e retorna o resultado)

* !npm <modulo> (Busca a descrição de um módulo através do [npmjs.org][npm])

* !frase (Apresenta uma frase aleatória)

* !hello (Apresenta "Hello world")

* !recorde (Apresenta o pico de usuários simultâneos registrado no canal)

* !hn (Apresenta uma notícia do Hacker News)

* !tagarelas (Exibe um Top 5 dos usuários que mais falam no canal)

## Como utilizar

    $ git clone https://github.com/zonetti/nodebrbot.git
    $ cd nodebrbot
    $ [sudo] npm install
    $ node app.js

Em poucos segundos após a inicialização o bot deve se conectar ao canal indicado no [config.json][config].

Para rodar os testes: `npm test` ou `make test`.

## Compilando o shell do V8 (necessário para o comando !eval)

    $ svn co http://v8.googlecode.com/svn/trunk v8-trunk
    $ cd v8-trunk && make dependencies
    $ make native


Depois de compilado, atualize o [config.json][config] modificando a propriedade `shell` para o caminho absoluto do shell do V8, que após a compilação neste exemplo, pode ser encontrado em `v8-trunk/out/native/shell`.

## Contribua

Saiba como adicionar novos comandos através deste [exemplo][exemplo].

[exemplo]: https://github.com/zonetti/nodebrbot/blob/master/src/commands/hello.js
[config]: https://github.com/zonetti/nodebrbot/blob/master/config.json
[npm]: https://npmjs.org/