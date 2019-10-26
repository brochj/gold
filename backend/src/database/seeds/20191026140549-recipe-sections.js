const faker = require('faker'); // eslint-disable-line
const numberOf = require('../../config/seeds');

const sections = [];

for (let i = 1; i <= numberOf.sections; i += 1) {
  const date = new Date();
  const steps = [];

  for (let j = 1; j <= faker.random.number({ min: 1, max: 5 }); j += 1) {
    steps.push({
      order: faker.random.number(100),
      text: faker.lorem.sentence(faker.random.number({ min: 1, max: 15 })),
      tip: faker.lorem.sentence(faker.random.number({ min: 1, max: 6 })),
    });
  }

  sections.push({
    recipe_id: faker.random.number({ min: 1, max: numberOf.recipes }),
    order: faker.random.number(7),
    title: faker.lorem.sentence(faker.random.number({ min: 1, max: 7 })),
    steps: JSON.stringify(steps),
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('section', sections, {});
  },

  down: queryInterface => queryInterface.bulkDelete('section', null, {}),
};
