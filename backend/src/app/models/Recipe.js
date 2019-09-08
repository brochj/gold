import Sequelize, { Model } from 'sequelize';

class Recipe extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        preparation_time: Sequelize.INTEGER,
        servings: Sequelize.INTEGER,
        private: Sequelize.BOOLEAN,
        difficulty: Sequelize.ENUM('easy', 'medium', 'hard'),
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Meal, { through: 'recipe_meal' });
  }
}

export default Recipe;
