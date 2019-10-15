import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  gender: faker.random.arrayElement(['male', 'female']),
  weight: faker.random.number({ min: 30, max: 300 }),
  height: faker.random.number({ min: 60, max: 250 }),
  birthday: faker.date.past(90, '2012-01-01'),
});

export default factory;
