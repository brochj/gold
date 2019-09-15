import Sequelize, { Model } from 'sequelize';

class Food extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        brand: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        freezeTableName: true,
        tableName: 'food',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // this.hasMany(models.NutritionFact, { foreignKey: 'food_id' }); // necessário?
    this.belongsToMany(models.Dish, {
      through: models.FoodDish,
      foreignKey: 'food_id',
    });
  }
}

export default Food;