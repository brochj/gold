import request from 'supertest';
import app from '../../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Oscar Broch',
        email: 'brochj@gmail.com',
        password: '123456',
        gender: 'male',
        weight: '70',
        height: '157',
        birthday: '1994-06-20',
      });

    expect(response.body).toHaveProperty('id');
  });
});
