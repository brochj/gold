import { Model } from 'sequelize';

class RecipeDish extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        freezeTableName: true,
        tableName: 'recipe_dish',
        sequelize,
      }
    );

    return this;
  }
}

export default RecipeDish;
