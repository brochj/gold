const faker = require('faker'); // eslint-disable-line
const numberOf = require('../../config/seeds');

const dishes = [];

for (let i = 1; i <= numberOf.dishes; i += 1) {
  const date = new Date();
  dishes.push({
    meal_id: faker.random.number({ min: 1, max: numberOf.meals }),
    title: faker.lorem.sentence(faker.random.number({ min: 1, max: 3 })),
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('dish', dishes, {});
  },

  down: queryInterface => queryInterface.bulkDelete('dish', null, {}),
};
