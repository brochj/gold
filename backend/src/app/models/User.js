import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        birthday: Sequelize.DATE,
        height: Sequelize.INTEGER,
        weight: Sequelize.INTEGER,
        gender: Sequelize.ENUM('male', 'female'),
      },
      {
        freezeTableName: true,
        tableName: 'user',
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Recipe, { foreignKey: 'user_id' }); // necessário?
  }
}

export default User;
