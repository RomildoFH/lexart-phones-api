# Lexart Phones Backend
Este projeto consiste em uma API desenvolvida em Node.js hospedada no Vercel, que oferece serviços para gerenciar produtos (celulares). A API inclui funcionalidades como registro e login de usuários, operações CRUD (Create, Read, Update, Delete) de produtos, e exposição de rotas para consumir e inserir produtos através de requisições externas.

### Requisitos
- Node.js para o backend
- Express.js para roteamento
- Sequelize para interação com o banco de dados
- Postgres do Vercel como banco de dados
- Funcionalidades
- Registro e Login de Usuários: A API oferece rotas para registro e login de usuários, garantindo autenticação e autorização.
- CRUD de Produtos: As operações CRUD permitem criar, ler, atualizar e excluir produtos do banco de dados.
- Rota de Consumo de Produtos: Existe uma rota específica para que clientes externos possam consumir os produtos, com algum tipo de autorização.
- Rota de Inserção de Produtos: Outra rota exclusiva permite que clientes externos insiram novos produtos, também com autorização.

### Estruturas de Dados:
A API suporta três estruturas diferentes para inserção de produtos, proporcionando flexibilidade para os clientes.

1. Estrutura simples:
```JS
{
   "name": "Xiaomi Redmi 9",
   "brand": "Xiaomi",
   "model": "Redmi 9",
   "price":  10000,
   "color": "red"
}
```

2. Estrutura detalhada:
```JS
{
   "name": "Xiaomi Redmi 9A",
   "details": {
       "brand": "Xiaomi",
       "model": "Redmi 9A",
       "color": "red"
   },
   "price":  11000
}
```

3. Array de estruturas:
```JS
[
  {
    "name": "Xiaomi Redmi 10",
    "brand": "Xiaomi",
    "model": "Redmi 10",
    "data": [
      {
        "price": 11500,
        "color": "red"
      },
      {
        "price": 12000,
        "color": "blue"
      }
    ]
  },
  {
    "name": "Iphone 15 Pro",
    "brand": "Iphone",
    "model": "15 Pro",
    "data": [
      {
        "price": 32000,
        "color": "silver"
      },
      {
        "price": 35000,
        "color": "gold"
      }
    ]
  }
]
```

4. Cadastro de usuário:
```JS
{
  "name": "Jhon Doe",
  "email": "jhondoe@email.com",
  "password": "12345678Ab@"
}
```
5. Login
```JS
{
  "email": "jhondoe@email.com",
  "password": "12345678Ab@"
}
```

## Como Utilizar

### Requisitos:
- Docker
- Docker Compose
- Git
- GitHub
- Node v16.0.0 ou Node v20.0.0 (recomendado)
- NVM v0.38.0

Observação, caso prefira rodar a aplicação sem fazer uso de Docker (Não recomendado), você deverá criar um arquivo <strong>.env</strong> na raíz do projeto similar a:
```JS
POSTGRES_HOST="postgres"
POSTGRES_DATABASE="lexart-phones-orm"
POSTGRES_USER="default"
POSTGRES_PASSWORD="password"
SERVER_PORT="3001"
JWT_SECRET="secrety"
NODE_ENVIRONMENT="development"
```

  1. Para utilizar a API você deverá fazer clone do repositório utilizando a chave SSH:
  ``` bash
  git clone git@github.com:RomildoFH/lexart-phones-api.git
  ```
  
  2. Acesse o repositório do projeto instale as dependências e inície os containers ou servidor local (caso tenha optado):
  ```bash
  npm install

  docker compose up -d
  ```

  3. Acesse o container da API através do comando:
  ```bash
  docker exec -it container_api bash
  ```

  4. Utilizando Sequelize você deverá criar o banco (caso não exista):
  ```bash
  npx sequelize-cli db:create
  ```

  5. Criar as tabelas no banco:
  ```bash
  npx sequelize-cli db:migrate
  ```

  6. (opcional) Subir os seedrs para popular o banco com dados prévios:
  ```bash
  npx sequelize-cli db:seed:all
  ```
A partir deste ponto o banco está em condições de ser utilizado e a API também.

### Rotas
<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Rota</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td>/products/:id</td>
      <td>Retorna um produto específico com o ID fornecido.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/products/</td>
      <td>Retorna todos os produtos.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/products/:limit/:page</td>
      <td>Retorna uma lista paginada de produtos com limite e página fornecidos.</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/products/</td>
      <td>Cria um novo produto.</td>
    </tr>
    <tr>
      <td>PATCH</td>
      <td>/products/:id</td>
      <td>Atualiza um produto existente com o ID fornecido.</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/products/:id</td>
      <td>Exclui um produto com o ID fornecido.</td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Rota</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/users/</td>
      <td>Cria um novo usuário.</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/users/admin</td>
      <td>Cria um novo administrador.</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/users/login</td>
      <td>Realiza o login de um usuário.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/users/</td>
      <td>Retorna todos os usuários.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/users/:id</td>
      <td>Retorna um usuário específico com o ID fornecido.</td>
    </tr>
    <tr>
      <td>PATCH</td>
      <td>/users/:id</td>
      <td>Atualiza um usuário existente com o ID fornecido.</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/users/:id</td>
      <td>Exclui um usuário com o ID fornecido.</td>
    </tr>
  </tbody>
</table>

<strong>**Atenção**</strong> exceto para as rotas de login e de registro, é necessário informar no Headers da requisição o Authorization com o token do usuário.

## Autoria

<table>
  <tbody>
    <tr>
      <td>Desenvolvimento:</td>
      <td>Romildo Silva</td>
    </tr>
    <tr>
      <td>Design:</td>
      <td>Romildo Silva</td>
    </tr>
  </tbody>
</table>

Este projeto foi desenvolvimento durante teste técnico para o processo de seleção de Desenvolvedor Full-Stack JavaScript da empresa Lexartlabs, não é permitido o compartilhamento de modo integral ou parcial sem prévia autorização do autor.
