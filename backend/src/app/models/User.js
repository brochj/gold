import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        birthday: Sequelize.DATE,
        height: Sequelize.INTEGER,
        weight: Sequelize.INTEGER,
        gender: Sequelize.ENUM('male', 'female'),
      },
      { sequelize }
    );
  }
}

export default User;
