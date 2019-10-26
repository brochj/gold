module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipe_dish', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      recipe_id: {
        type: Sequelize.INTEGER,
        references: { model: 'recipe', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      dish_id: {
        type: Sequelize.INTEGER,
        references: { model: 'dish', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('recipe_dish');
  },
};
