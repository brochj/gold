const faker = require('faker'); // eslint-disable-line
const numberOf = require('../../config/seeds');

const RecipeDishes = [];

for (let i = 1; i <= numberOf.RecipeDishes; i += 1) {
  const date = new Date();
  RecipeDishes.push({
    recipe_id: faker.random.number({ min: 1, max: numberOf.recipes }),
    dish_id: faker.random.number({ min: 1, max: numberOf.dishes }),
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('recipe_dish', RecipeDishes, {});
  },

  down: queryInterface => queryInterface.bulkDelete('recipe_dish', null, {}),
};
