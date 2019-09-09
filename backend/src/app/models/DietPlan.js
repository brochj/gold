import Sequelize, { Model } from 'sequelize';
import { defineDifficulty } from '../util/dietPlanCalc';

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
        difficulty: {
          type: Sequelize.VIRTUAL,
          get() {
            return defineDifficulty(this.calorie_intake, this.calorie_goal);
          },
        },
      },
      {
        freezeTableName: true,
        tableName: 'diet_plan',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'creator' });
    this.hasMany(models.Meal, { foreignKey: 'diet_plan_id' }); // necessário?
  }
}

export default DietPlan;
