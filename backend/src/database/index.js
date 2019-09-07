import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // esse método que vai fazer a conexao com o DB e carregar os models
    this.connection = new Sequelize(databaseConfig);
    // em this.connection já temos a conexão com a DB feita
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
