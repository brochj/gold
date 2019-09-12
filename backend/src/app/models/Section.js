import Sequelize, { Model } from 'sequelize';

class Section extends Model {
  static init(sequelize) {
    super.init(
      {
        order: Sequelize.INTEGER,
        title: Sequelize.STRING,
        steps: {
          type: Sequelize.TEXT('long'),
          get() {
            return JSON.parse(this.getDataValue('steps'));
          },
          set(valueToBeSet) {
            return this.setDataValue('steps', JSON.stringify(valueToBeSet));
          },
        },
      },
      {
        freezeTableName: true,
        tableName: 'section',
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipe, { foreignKey: 'recipe_id' });
  }
}

export default Section;
