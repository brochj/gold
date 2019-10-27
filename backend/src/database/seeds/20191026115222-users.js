const faker = require('faker'); // eslint-disable-line

const numberOf = require('../../config/seeds');

const users = [];

for (let i = 1; i <= numberOf.users; i += 1) {
  const date = new Date();
  users.push({
    id: i,
    name: faker.name.findName(),
    email: faker.internet.email().toLocaleLowerCase(),
    password_hash:
      '$2a$08$yIzw6uZsyKum50NU8qp9h.rCfwghMB49rigY3LrVB4WGwH08JUN46',
    birthday: faker.date.past(80, date),
    height: faker.random.number({ min: 30, max: 250 }),
    weight: faker.finance.amount(30, 300, 1),
    gender: faker.random.arrayElement(['male', 'female']),
    created_at: date,
    updated_at: date,
  });
}

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('user', users, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "user_id_seq" RESTART WITH ${users.length + 1}`
    );
  },

  down: queryInterface => queryInterface.bulkDelete('user', null, {}),
};
