# nodebrbot [![Build Status](https://secure.travis-ci.org/nodebr/nodebrbot.png?branch=0.1.0-alpha)](http://travis-ci.org/nodebr/nodebrbot)

Um robô para o canal #nodebr na Freenode.

### Comandos atuais

* `!eval` (Executa o comando dentro de uma VM e retorna o resultado)

* `!npm` (Busca módulos e descrição através do [npmjs.org][npm])

### Como utilizar

    $ git clone https://github.com/nodebrbot/nodebrbot
    $ cd nodebrbot
    $ [sudo] npm install
    $ node app.js

Em poucos segundos após a inicialização o bot deve se conectar ao canal indicado
no [default.json][config].

### Testes

Para rodar os testes: `npm test` ou `make test`.

### Contribua

Para contribuir, siga os passos abaixo:

 * Saiba como adicionar novos comandos através deste [exemplo][exemplo].
 * Envie suas pull requests para a branch da versão desejada, não para o master.
 * Sempre documente seu código.
 * Sempre envie os testes para o seu novo código.

### Todo

Gostaria de começar a contribuir? Aqui temos algumas ideias:

 * Testes para o código já existente
 * Documentação
 * Documentação inline

### Licença

Copyright (c) <2014> <NodeBR>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[exemplo]: https://github.com/nodebr/nodebrbot/blob/master/src/example/command.json
[config]: https://github.com/nodebr/nodebrbot/blob/master/src/config.json
[npm]: https://npmjs.org/
