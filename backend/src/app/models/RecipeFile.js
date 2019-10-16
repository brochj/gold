import Sequelize, { Model } from 'sequelize';

class RecipeFile extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        freezeTableName: true,
        tableName: 'recipe_file',
        sequelize,
      }
    );

    return this;
  }
}

export default RecipeFile;
