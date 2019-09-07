import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Oscar',
    email: 'brochj@gmail.com',
    password_hash: '213124321',
    birthday: '1994-06-20T00:00:00-03:00',
    height: 175,
    weight: 70,
    gender: 'male',
  });

  return res.json(user);
});

export default routes;
