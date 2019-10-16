module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('nutrition_fact', {
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
      iron: { type: Sequelize.INTEGER, allowNull: true },
      fiber: { type: Sequelize.INTEGER, allowNull: true },
      energy: { type: Sequelize.INTEGER, allowNull: false },
      sodium: { type: Sequelize.INTEGER, allowNull: true },
      sugars: { type: Sequelize.INTEGER, allowNull: true },
      calcium: { type: Sequelize.INTEGER, allowNull: true },
      proteins: { type: Sequelize.INTEGER, allowNull: true },
      total_fat: { type: Sequelize.INTEGER, allowNull: true },
      trans_fat: { type: Sequelize.INTEGER, allowNull: true },
      vitamin_a: { type: Sequelize.INTEGER, allowNull: true },
      vitamin_c: { type: Sequelize.INTEGER, allowNull: true },
      vitamin_d: { type: Sequelize.INTEGER, allowNull: true },
      potassium: { type: Sequelize.INTEGER, allowNull: true },
      cholesterol: { type: Sequelize.INTEGER, allowNull: true },
      custom_unit: { type: Sequelize.STRING(50), allowNull: true },
      carbohydrate: { type: Sequelize.INTEGER, allowNull: true },
      custom_value: { type: Sequelize.INTEGER, allowNull: true },
      saturated_fat: { type: Sequelize.INTEGER, allowNull: true },
      serving_unit: { type: Sequelize.STRING(100), allowNull: false },
      serving_value: { type: Sequelize.INTEGER, allowNull: false },
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
    return queryInterface.dropTable('nutrition_fact');
  },
};
