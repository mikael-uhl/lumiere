# Lumière API

Esta API é uma plataforma para o gerenciamento eficiente de mídia como filmes e séries. A API do Lumière permite cadastro e controle de usuários, associação de usuários em grupos, organização de listas de conteúdo em categorias e itens de conteúdo, definição de filas de exibição e possui suporte à autenticação para proteger dados sensíveis.

## Funcionalidades Principais

- **Autenticação Segura:** Proteja seus dados com autenticação JWT (JSON Web Tokens) de última geração.
- **Gerenciamento de Usuários:** Crie e gerencie contas de usuário com informações personalizadas.
- **Grupos:** Organize usuários em grupos e gerencie permissões e acesso ao conteúdo.
- **Listas de Conteúdo:** Crie, atualize e compartilhe listas de conteúdo de forma fácil.
- **Recursos Adicionais:** Explore outros recursos, como categorização de conteúdo e muito mais.

## Requisitos

- [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) instalados.
- [Docker](https://www.docker.com/) instalado e configurado.
- [Git](https://git-scm.com/) para clonar o repositório (opcional).

## Instalação

1. Clone o repositório:

```bash
git clone git@github.com:mikael-uhl/lumiere.git
```

2. Instale as dependências:

```bash
cd lumiere
npm install
```

3. Configure suas variáveis de ambiente no arquivo .env:

```bash
DATABASE_USER=postgres
DATABASE_DIALECT=postgres
DATABASE_NAME=postgres
DATABASE_HOST=localhost
DATABASE_PASSWORD=""
SECRET_KEY="chaveSecreta"
PORT=5000
```

4. Inicie o banco de dados:

```bash
docker compose up
```

5. Inicie o servidor:

```bash
yarn dev
```

6. Criar tabelas do banco de dados:

```bash
localhost:5000/create-tables
```

A API estará disponível em http://localhost:5000.

## Documentação da API

Acesse a documentação da API em http://localhost:5000/apidocs para obter informações detalhadas sobre os endpoints e como utilizá-los.