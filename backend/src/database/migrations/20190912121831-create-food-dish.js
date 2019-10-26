module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('food_dish', {
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
    return queryInterface.dropTable('food_dish');
  },
};
