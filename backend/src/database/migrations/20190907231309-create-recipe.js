module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipe', {
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
        onDelete: 'SET NULL',
        allowNull: true,
      },
      cover_id: {
        type: Sequelize.INTEGER,
        references: { model: 'recipe_file', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(1200),
        allowNull: true,
      },
      preparation_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      servings: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_private: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      difficulty: {
        type: Sequelize.ENUM,
        values: ['easy', 'medium', 'hard'],
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
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
    return queryInterface.dropTable('recipe');
  },
};
