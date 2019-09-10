import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipeController from './app/controllers/RecipeController';
import DietPlanController from './app/controllers/DietPlanController';
import MealController from './app/controllers/MealController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipes', RecipeController.index);
routes.post('/recipes', RecipeController.store);
routes.put('/recipes/:id', RecipeController.update);
routes.delete('/recipes/:id', RecipeController.delete);

routes.get('/dietplans', DietPlanController.index);
routes.post('/dietplans', DietPlanController.store);
routes.put('/dietplans/:id', DietPlanController.update);
routes.delete('/dietplans/:id', DietPlanController.delete);

routes.get('/dietplans/:id/meals', MealController.index);
routes.post('/dietplans/:id/meals', MealController.store);
routes.put('/dietplans/:id/meals/:mealId', MealController.update);
routes.delete('/dietplans/:id/meals/:mealId', MealController.delete);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

export default routes;
