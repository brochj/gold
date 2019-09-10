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

routes.get('/diet-plans', DietPlanController.index);
routes.post('/diet-plans', DietPlanController.store);
routes.put('/diet-plans/:id', DietPlanController.update);
routes.delete('/diet-plans/:id', DietPlanController.delete);

routes.get('/diet-plans/:dietPlanId/meals', MealController.index);
routes.post('/diet-plans/:dietPlanId/meals', MealController.store);
routes.put('/diet-plans/:dietPlanId/meals/:id', MealController.update);
routes.delete('/diet-plans/:dietPlanId/meals/:id', MealController.delete);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

export default routes;
