import { Model } from 'sequelize';

class FoodDish extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        freezeTableName: true,
        tableName: 'food-dish',
        sequelize,
      }
    );

    return this;
  }
}

export default FoodDish;
