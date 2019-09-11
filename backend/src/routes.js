import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import dietPlanMiddleware from './app/middlewares/dietPlan';
import mealMiddleware from './app/middlewares/meal';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import RecipeController from './app/controllers/RecipeController';

import DietPlanController from './app/controllers/DietPlanController';
import MealController from './app/controllers/MealController';
import DishController from './app/controllers/DishController';

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

const diets = '/diet-plans/:dietPlanId';
routes.use(diets, dietPlanMiddleware);

routes.get(`${diets}/meals`, MealController.index);
routes.post(`${diets}/meals`, MealController.store);
routes.put(`${diets}/meals/:id`, MealController.update);
routes.delete(`${diets}/meals/:id`, MealController.delete);

const meals = `${diets}/meals/:mealId`;

routes.use(meals, mealMiddleware);

routes.get(`${meals}/dishes`, DishController.index);
routes.post(`${meals}/dishes`, DishController.store);
routes.put(`${meals}/dishes/:id`, DishController.update);
routes.delete(`${meals}/dishes/:id`, DishController.delete);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

export default routes;
