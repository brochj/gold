const faker = require('faker'); // eslint-disable-line
const numberOf = require('../../config/seeds');

const meals = [];

for (let i = 1; i <= numberOf.meals; i += 1) {
  const date = new Date();
  meals.push({
    diet_plan_id: faker.random.number({ min: 1, max: numberOf.dietPlans }),
    calorie: faker.random.number({ min: 50, max: 5000 }),
    title: faker.random.arrayElement([
      'Café da Manhã',
      'Café da Manhã low carb',
      'Lanche da Manhã',
      'Almoço',
      'Almoço low carb',
      'Lanche da Tarde',
      'Jantar',
      'Ceia',
    ]),
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('meal', meals, {});
  },

  down: queryInterface => queryInterface.bulkDelete('meal', null, {}),
};
