# Trybe Futebol Club ⚽

Projeto de avaliação do módulo de back-end do da Trybe onde eu desenvolvi uma Api para uma aplicação front-end já preparada, onde minha Api o alimentava com as informações vindo do banco de dados.

# Iniciando a aplicação

<details>
  <summary><b>Iniciando o projeto com docker 🐳</b></summary><br>

  ***⚠️ Para garantir um bom funcionamento é necessário que tenha instalado o docker e o docker-compose nas versões 20.10.16 e 1.29 ou superior respectivamente⚠️***
  
  <br />

  1. Clone o projeto

  ```bash
    git clone git@github.com:Pedro0505/Trybe-Futebol-Clube.git
  ```

  2. Entre no diretório do projeto

  ```bash
    cd Trybe-Futebol-Clube
  ```

  3. Suba os containers

  ```bash
    docker-compose up --build -d
  ```

  5. Quando o processo dos containers estiver acabado acesse a aplicação usando o seguinte endereço

  ```bash
    http://localhost:3000
  ```

  6. Para derrubar os containers

  ```bash
    docker-compose down --rmi all --volumes --remove-orphans
  ```
</details>

<details>
  <summary><b>Node</b></summary><br>

  ***⚠️ Para rodar localmente é necessário ter o MySql instalado localmente ⚠️***

  ***⚠️ Obs: Para o orm funcionar deve ser preenchido o arquivo '.env' com as informações necessárias, as chaves que precisam ser colocadas estão no arquivo '.env.example' ⚠️***

  <br />

  Clone o projeto

  ```bash
    git clone git@github.com:Pedro0505/Trybe-Futebol-Clube.git
  ```

  Entre no diretório do projeto

  ```bash
    cd Trybe-Futebol-Clube
  ```

  Instale as dependências

  ```bash
    npm run install:apps
  ```

  Inicie o servidor

  ```bash
    cd backend
    npm start
  ```
  
  Inicie o frontend

  ```bash
    cd frontend
    npm start
  ```

  Acesse a aplicação usando o seguinte endereço

  ```bash
    localhost:3000
  ```
</details>

# Stacks 📚

- React
- NodeJs
- Docker
- Express
- MySql
- Sequelize
- Sinon
- Mocha
- Chai
- Typescript
- JWT

# Copyrights ©️

Front-End desenvolvido pela equipe da [Trybe](https://github.com/betrybe)

Back-end implementado por [Pedro](https://github.com/Pedro0505)
