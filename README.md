# nodebrbot [![Build Status](https://secure.travis-ci.org/nodebr/nodebrbot.png)](http://travis-ci.org/nodebr/nodebrbot)

Um robô para o canal #nodebr na Freenode.

## Comandos atuais

* `!comandos` (Exibe uma lista com todos os comandos existentes)

* `!eval` (Executa o comando dentro de uma VM e retorna o resultado)

* `!npm` (Busca a descrição de um módulo através do [npmjs.org][npm])

* `!frase` (Apresenta uma frase aleatória)

* `!hello` (Apresenta "Hello world")

* `!recorde` (Apresenta o pico de usuários simultâneos registrado no canal)

* `!hn` (Apresenta uma notícia do Hacker News)

* `!tagarelas` (Exibe um Top 5 dos usuários que mais falam no canal)

*  `!gif` (Exibe a URL de uma gif através da API giphy)

*  `!socorro` (Chama a atenção dos demais usuários para te ajudar)

## Como utilizar

    $ git clone https://github.com/zonetti/nodebrbot.git
    $ cd nodebrbot
    $ [sudo] npm install
    $ node app.js

Em poucos segundos após a inicialização o bot deve se conectar ao canal indicado no [config.json][config].

Para rodar os testes: `npm test` ou `make test`.

## Contribua

Saiba como adicionar novos comandos através deste [exemplo][exemplo].

[exemplo]: https://github.com/nodebr/nodebrbot/blob/master/src/commands/hello.js
[config]: https://github.com/nodebr/nodebrbot/blob/master/config.json
[npm]: https://npmjs.org/
