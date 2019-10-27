const faker = require('faker'); // eslint-disable-line
const numberOf = require('../../config/seeds');

const foods = [];

for (let i = 1; i <= numberOf.foods; i += 1) {
  const date = new Date();
  foods.push({
    name: faker.lorem.sentence(faker.random.number({ min: 1, max: 2 })),
    brand: faker.lorem.sentence(faker.random.number({ min: 1, max: 2 })),
    description: faker.lorem.sentences(
      faker.random.number({ min: 1, max: 7 }),
      '\n'
    ),
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('food', foods, {});
  },

  down: queryInterface => queryInterface.bulkDelete('food', null, {}),
};
