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

  // static associate(models) {
  //   this.hasMany(models.NutritionFact, { foreignKey: 'food_id' }); // necessário?
  // }
}

export default Food;
