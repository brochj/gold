const faker = require('faker'); // eslint-disable-line
const numberOf = require('../../config/seeds');

const ingredients = [];

for (let i = 1; i <= numberOf.ingredients; i += 1) {
  const date = new Date();
  ingredients.push({
    food_id: faker.random.number({ min: 1, max: numberOf.foods }),
    recipe_id: faker.random.number({ min: 1, max: numberOf.recipes }),
    quantity: faker.finance.amount(0, 100, 2),
    unit: faker.random.alphaNumeric(2),
    preparation: faker.lorem.sentence(faker.random.number({ min: 1, max: 2 })),
    tip: faker.lorem.sentence(faker.random.number({ min: 1, max: 6 })),
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('ingredient', ingredients, {});
  },

  down: queryInterface => queryInterface.bulkDelete('ingredient', null, {}),
};
