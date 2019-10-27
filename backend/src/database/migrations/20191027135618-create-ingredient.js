module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ingredient', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      food_id: {
        type: Sequelize.INTEGER,
        references: { model: 'food', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      recipe_id: {
        type: Sequelize.INTEGER,
        references: { model: 'recipe', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
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
        allowNull: false,
      },
      tip: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('ingredient');
  },
};
