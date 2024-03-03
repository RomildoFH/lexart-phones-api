// src/database/index.js
const { Sequelize } = require('sequelize');
const User = require('../app/models/user');
const env = 'development';

const connectionDatabase = require('../config/database')[env];

console.log('connectionDatabase: ' + connectionDatabase.database)

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  async init() {
    try {
      console.log('Dentro do init')
      this.connection = new Sequelize(connectionDatabase)
      try {
        await this.connection.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
      } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
      }

      models.forEach((model) => {
        console.log(`Inicializando modelo ${model.name}`);
        model.init(this.connection)
      })

      console.log('Sequelize inicializado e conectado com sucesso.');
    } catch (error) {
      console.error('Erro ao inicializar o Sequelize:', error);
    }
  }
}

module.exports = Database;
