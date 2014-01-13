# nodebrbot [![Build Status](https://secure.travis-ci.org/zonetti/nodebrbot.png)](http://travis-ci.org/zonetti/nodebrbot)

Um robô para o canal #nodebr na Freenode.

## Comandos atuais

* `!comandos` (Exibe uma lista com todos os comandos existentes)

* `!eval` <comando> (Executa o comando dentro da V8 e retorna o resultado)

* `!npm` <modulo> (Busca a descrição de um módulo através do [npmjs.org][npm])

* `!frase` (Apresenta uma frase aleatória)

* `!hello` (Apresenta "Hello world")

* `!recorde` (Apresenta o pico de usuários simultâneos registrado no canal)

* `!hn` (Apresenta uma notícia do Hacker News)

* `!tagarelas` (Exibe um Top 5 dos usuários que mais falam no canal)

## Como utilizar

    $ git clone https://github.com/zonetti/nodebrbot.git
    $ cd nodebrbot
    $ [sudo] npm install
    $ node app.js

Em poucos segundos após a inicialização o bot deve se conectar ao canal indicado no [config.json][config].

Para rodar os testes: `npm test` ou `make test`.

## Obtendo o shell do V8

**Necessário para executar o comando `!eval`.**

    $ git clone https://code.google.com/p/v8-shell-bin/
    $ sudo install -v v8-shell-bin/linux-x64/shell-v8 /usr/bin/shell-v8

**OBS:** O caminho do shell do V8 deve ser mapeado pelo `config.json` através da propriedade `shell`, sendo `/usr/bin/shell-v8` o caminho padrão.

## Contribua

Saiba como adicionar novos comandos através deste [exemplo][exemplo].

[exemplo]: https://github.com/zonetti/nodebrbot/blob/master/src/commands/hello.js
[config]: https://github.com/zonetti/nodebrbot/blob/master/config.json
[npm]: https://npmjs.org/
