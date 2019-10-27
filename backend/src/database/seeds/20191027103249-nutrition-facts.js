const faker = require('faker'); // eslint-disable-line
const numberOf = require('../../config/seeds');

const nutritionFacts = [];

for (let i = 1; i <= numberOf.nutritionFacts; i += 1) {
  const date = new Date();
  nutritionFacts.push({
    food_id: i,
    iron: faker.finance.amount(1, 100, 1),
    fiber: faker.finance.amount(1, 100, 1),
    energy: faker.finance.amount(1, 500, 0),
    sodium: faker.finance.amount(1, 100, 1),
    sugars: faker.finance.amount(1, 100, 1),
    calcium: faker.finance.amount(1, 100, 1),
    proteins: faker.finance.amount(1, 100, 1),
    total_fat: faker.finance.amount(1, 100, 1),
    trans_fat: faker.finance.amount(1, 100, 1),
    vitamin_a: faker.finance.amount(1, 100, 1),
    vitamin_c: faker.finance.amount(1, 100, 1),
    vitamin_d: faker.finance.amount(1, 100, 1),
    potassium: faker.finance.amount(1, 100, 1),
    cholesterol: faker.finance.amount(1, 100, 1),
    custom_unit: faker.random.alphaNumeric(2),
    carbohydrate: faker.finance.amount(1, 100, 1),
    custom_value: faker.finance.amount(1, 100, 1),
    saturated_fat: faker.finance.amount(1, 100, 1),
    serving_unit: faker.random.alphaNumeric(2),
    serving_value: faker.finance.amount(1, 200, 1),
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('nutrition_fact', nutritionFacts, {});
  },

  down: queryInterface => queryInterface.bulkDelete('nutrition_fact', null, {}),
};
