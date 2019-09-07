import Sequelize, { Model } from 'sequelize';

class DietPlan extends Model {
  static init(sequelize) {
    super.init(
      {
        calorie_intake: Sequelize.INTEGER,
        calorie_goal: Sequelize.INTEGER,
        objective: Sequelize.ENUM('gainMuscle', 'weightLoss', 'maintainWeight'),
        physical_activity: Sequelize.ENUM(
          'light',
          'moderate',
          'high',
          'intense'
        ),
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default DietPlan;
