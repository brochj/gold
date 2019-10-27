import Sequelize, { Model } from 'sequelize';

class Ingredient extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: Sequelize.DECIMAL(10, 2),
        unit: Sequelize.STRING(100),
        preparation: Sequelize.STRING,
        tip: Sequelize.STRING,
      },
      {
        freezeTableName: true,
        tableName: 'ingredient',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.DietPlan, {
      foreignKey: 'diet_plan_id',
      as: 'diet_plan',
    });
  }
}

export default Ingredient;
