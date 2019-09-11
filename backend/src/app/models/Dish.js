import Sequelize, { Model } from 'sequelize';
import RecipeDish from './RecipeDish';

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
      through: RecipeDish,
      foreignKey: 'dish_id',
    });
  }
}

export default Dish;
