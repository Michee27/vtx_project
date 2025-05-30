# Projeto de Apostas Esportivas VTX

Este projeto demonstra a construção de uma aplicação web de apostas esportivas, com um frontend em HTML, CSS e JavaScript puro, e um backend em Node.js (Express) com PostgreSQL e Knex para manipulação de dados.

## Tecnologias Utilizadas

    Frontend: HTML5, CSS3, JavaScript (ES6+)
    Backend: Node.js, Express.js
    Banco de Dados: PostgreSQL
    ORM/Query Builder: Knex.js

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

    Node.js (versão LTS recomendada)
    npm (gerenciador de pacotes do Node.js, vem com o Node.js)
    PostgreSQL (servidor de banco de dados)

Snippet de conexão de banco

    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=seu_usuario_postgres
    DB_PASSWORD=sua_senha_postgres
    DB_NAME=sports_betting_app
    PORT=3000

Popule o banco de dados com dados com os script que está no arquivo: `database/migrations.js`

Inicie o servidor backend:

`npm run dev`

O servidor será iniciado na porta 3000. Você verá uma mensagem no terminal indicando que o servidor está rodando.

Configuração do Frontend (HTML, CSS, JavaScript) O frontend é uma aplicação simples em HTML/CSS/JS puro.

Navegue até o diretório do frontend e abra o arquivo index.html em seu navegador web preferido.
