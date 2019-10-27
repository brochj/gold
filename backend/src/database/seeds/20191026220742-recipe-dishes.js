const faker = require('faker'); // eslint-disable-line
const numberOf = require('../../config/seeds');

const recipeDishes = [];

for (let i = 1; i <= numberOf.recipeDishes; i += 1) {
  const date = new Date();
  recipeDishes.push({
    recipe_id: faker.random.number({ min: 1, max: numberOf.recipes }),
    dish_id: faker.random.number({ min: 1, max: numberOf.dishes }),
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('recipe_dish', recipeDishes, {});
  },

  down: queryInterface => queryInterface.bulkDelete('recipe_dish', null, {}),
};
