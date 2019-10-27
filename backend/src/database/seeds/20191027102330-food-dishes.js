const faker = require('faker'); // eslint-disable-line
const numberOf = require('../../config/seeds');

const foodDishes = [];

for (let i = 1; i <= numberOf.foodDishes; i += 1) {
  const date = new Date();
  foodDishes.push({
    food_id: faker.random.number({ min: 1, max: numberOf.foods }),
    dish_id: faker.random.number({ min: 1, max: numberOf.dishes }),
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('food_dish', foodDishes, {});
  },

  down: queryInterface => queryInterface.bulkDelete('food_dish', null, {}),
};
