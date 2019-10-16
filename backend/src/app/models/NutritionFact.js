import Sequelize, { Model } from 'sequelize';

class NutritionFact extends Model {
  static init(sequelize) {
    super.init(
      {
        iron: { type: Sequelize.INTEGER, allowNull: true },
        fiber: { type: Sequelize.INTEGER, allowNull: true },
        energy: { type: Sequelize.INTEGER, allowNull: false },
        sodium: { type: Sequelize.INTEGER, allowNull: true },
        sugars: { type: Sequelize.INTEGER, allowNull: true },
        calcium: { type: Sequelize.INTEGER, allowNull: true },
        proteins: { type: Sequelize.INTEGER, allowNull: true },
        total_fat: { type: Sequelize.INTEGER, allowNull: true },
        trans_fat: { type: Sequelize.INTEGER, allowNull: true },
        vitamin_a: { type: Sequelize.INTEGER, allowNull: true },
        vitamin_c: { type: Sequelize.INTEGER, allowNull: true },
        vitamin_d: { type: Sequelize.INTEGER, allowNull: true },
        potassium: { type: Sequelize.INTEGER, allowNull: true },
        cholesterol: { type: Sequelize.INTEGER, allowNull: true },
        custom_unit: { type: Sequelize.STRING(50), allowNull: true },
        carbohydrate: { type: Sequelize.INTEGER, allowNull: true },
        custom_value: { type: Sequelize.INTEGER, allowNull: true },
        saturated_fat: { type: Sequelize.INTEGER, allowNull: true },
        serving_unit: { type: Sequelize.STRING(100), allowNull: false },
        serving_value: { type: Sequelize.INTEGER, allowNull: false },
      },
      {
        freezeTableName: true,
        tableName: 'nutrition_fact',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Food, { foreignKey: 'food_id' });
  }
}

export default NutritionFact;
