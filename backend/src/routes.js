import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipeController from './app/controllers/RecipeController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipes', RecipeController.store);
routes.delete('/recipes/:id', RecipeController.delete);
routes.put('/recipes/:id', RecipeController.update);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

export default routes;
