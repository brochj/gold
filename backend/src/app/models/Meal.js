import Sequelize, { Model } from 'sequelize';

class Meal extends Model {
  static init(sequelize) {
    super.init(
      {
        calorie: Sequelize.INTEGER,
        title: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.DietPlan, { foreignKey: 'diet_plan_id' });
  }
}

export default Meal;
