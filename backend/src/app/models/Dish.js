import Sequelize, { Model } from 'sequelize';

class Dish extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
      },
      {
        freezeTableName: true,
        tableName: 'dish',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Meal, { foreignKey: 'meal_id', as: 'meal' });
    this.belongsToMany(models.Recipe, {
      through: models.RecipeDish,
      as: 'recipes',
      foreignKey: 'dish_id',
    });
  }
}

export default Dish;
