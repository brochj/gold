module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('diet_plan', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'user', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      calorie_intake: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      calorie_goal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      physical_activity: {
        type: Sequelize.ENUM,
        values: ['light', 'moderate', 'high', 'intense'],
        allowNull: false,
      },
      objective: {
        type: Sequelize.ENUM,
        values: ['gainMuscle', 'weightLoss', 'maintainWeight'],
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
    return queryInterface.dropTable('diet_plan');
  },
};
