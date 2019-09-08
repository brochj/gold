module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('meal', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      diet_plan_id: {
        type: Sequelize.INTEGER,
        references: { model: 'diet_plan', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      calorie: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
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
    return queryInterface.dropTable('meal');
  },
};
