import Sequelize, { Model } from 'sequelize';

class Meal extends Model {
  static init(sequelize) {
    super.init(
      {
        calorie: Sequelize.INTEGER,
        title: Sequelize.STRING,
      },
      {
        freezeTableName: true,
        tableName: 'meal',
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

export default Meal;
