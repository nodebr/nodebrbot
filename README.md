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

## Compilando o shell para utilizar no bot

    $ svn co http://v8.googlecode.com/svn/trunk v8-trunk
    $ cd v8-trunk && make dependencies
    $ make native


O executável do shell deve estar dentro da pasta `./out/native`, é necesário incluir o path
inteiro (com o executável) no [config.json][config];

## Contribua

Saiba como adicionar novos comandos através deste [exemplo][exemplo].

[exemplo]: https://github.com/zonetti/nodebrbot/blob/master/src/commands/hello.js
[config]: https://github.com/zonetti/nodebrbot/blob/master/config.json
[npm]: https://npmjs.org/
