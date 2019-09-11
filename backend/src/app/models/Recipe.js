import Sequelize, { Model } from 'sequelize';

class Recipe extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        preparation_time: Sequelize.INTEGER,
        servings: Sequelize.INTEGER,
        is_private: Sequelize.BOOLEAN,
        difficulty: Sequelize.ENUM('easy', 'medium', 'hard'),
      },
      {
        freezeTableName: true,
        tableName: 'recipe',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'creator' });
  }
}

export default Recipe;