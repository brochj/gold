import Sequelize, { Model } from 'sequelize';

class Ingredient extends Model {
  static init(sequelize) {
    super.init(
      {
        quantity: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        unit: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        preparation: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        tip: {
          type: Sequelize.STRING,
          allowNull: true,
        },
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
    this.belongsTo(models.Food, { foreignKey: 'food_id', as: 'food' });
  }
}

export default Ingredient;
