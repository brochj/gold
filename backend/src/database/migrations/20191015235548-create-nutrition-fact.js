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
      iron: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      fiber: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      energy: { type: Sequelize.DECIMAL(10, 1), allowNull: false },
      sodium: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      sugars: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      calcium: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      proteins: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      total_fat: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      trans_fat: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      vitamin_a: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      vitamin_c: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      vitamin_d: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      potassium: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      cholesterol: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      custom_unit: { type: Sequelize.STRING(50), allowNull: true },
      carbohydrate: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      custom_value: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      saturated_fat: { type: Sequelize.DECIMAL(10, 1), allowNull: true },
      serving_unit: { type: Sequelize.STRING(100), allowNull: false },
      serving_value: { type: Sequelize.DECIMAL(10, 1), allowNull: false },
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
