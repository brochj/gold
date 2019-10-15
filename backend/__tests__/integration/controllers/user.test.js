import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../../src/app';
import factory from '../../factories';

import User from '../../../src/app/models/User';
import truncate from '../../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should be able to create a session', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/users')
      .send(user);

    const { email } = response.body;
    const { password } = user;
    const session = await request(app)
      .post('/sessions')
      .send({ email, password });

    expect(session.body).toHaveProperty('token');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Oscar Broch',
        email: 'brochj@gmail.com',
        password: '34bi4h23dn93onf',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Oscar Broch',
        email: 'brochj@gmail.com',
        password: '34bi4h23dn93onf',
      });

    expect(response.status).toBe(400);
  });

  // TODO
  // it('should encrypt user password when new user created', async () => {
  //   const user = await factory.create('User', { password: '123456' });
  //   console.log(user);

  //   const compareHash = await bcrypt.compare('123456', user.password_hash);
  //   expect(compareHash).toBe(true);
  // });
});
