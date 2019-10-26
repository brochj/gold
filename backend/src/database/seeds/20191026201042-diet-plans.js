const faker = require('faker'); // eslint-disable-line
const numberOf = require('../../config/seeds');

const dietPlans = [];

for (let i = 1; i <= numberOf.dietPlans; i += 1) {
  const date = new Date();
  dietPlans.push({
    user_id: faker.random.number({ min: 1, max: numberOf.users }),
    calorie_intake: faker.random.number({ min: 500, max: 10000 }),
    calorie_goal: faker.random.number({ min: 500, max: 10000 }),
    physical_activity: faker.random.arrayElement([
      'light',
      'moderate',
      'high',
      'intense',
    ]),
    objective: faker.random.arrayElement([
      'gainMuscle',
      'weightLoss',
      'maintainWeight',
    ]),
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('diet_plan', dietPlans, {});
  },

  down: queryInterface => queryInterface.bulkDelete('diet_plan', null, {}),
};
