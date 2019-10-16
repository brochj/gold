module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('recipe', 'cover_id', {
      type: Sequelize.INTEGER,
      references: { model: 'recipe_file', key: 'id' },
      ouUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('recipe', 'cover_id');
  },
};
