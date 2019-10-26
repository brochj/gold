const faker = require('faker'); // eslint-disable-line
const numberOf = require('../../config/seeds');

const recipes = [];

for (let i = 1; i <= numberOf.recipes; i += 1) {
  const date = new Date();
  recipes.push({
    user_id: faker.random.number({ min: 1, max: numberOf.users }),
    cover_id: faker.random.number({ min: 1, max: 12 }),
    name: faker.lorem.sentence(faker.random.number({ min: 1, max: 7 })),
    description: faker.lorem.sentences(
      faker.random.number({ min: 1, max: 7 }),
      '\n'
    ),
    preparation_time: faker.random.number({ min: 1, max: 300 }),
    servings: faker.random.number({ min: 1, max: 30 }),
    is_private: faker.random.boolean(),
    difficulty: faker.random.arrayElement(['easy', 'medium', 'hard']),
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('recipe', recipes, {});
  },

  down: queryInterface => queryInterface.bulkDelete('recipe', null, {}),
};
