import { Router } from 'express';
import multer from 'multer';
import { recipeFilesConfig } from './config/multer';

import authMiddleware from './app/middlewares/auth';
import dietPlanMiddleware from './app/middlewares/dietPlan';
import mealMiddleware from './app/middlewares/meal';
import dishMiddleware from './app/middlewares/dish';
import foodMiddleware from './app/middlewares/food';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import RecipeFileController from './app/controllers/RecipeFileController';

import RecipeController from './app/controllers/RecipeController';
import FoodController from './app/controllers/FoodController';
import NutritionFactController from './app/controllers/NutritionFactController';

import DietPlanController from './app/controllers/DietPlanController';
import MealController from './app/controllers/MealController';
import DishController from './app/controllers/DishController';
import RecipeDishController from './app/controllers/RecipeDishController';
import FoodDishController from './app/controllers/FoodDishController';

const routes = new Router();
const recipeUpload = multer(recipeFilesConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post(
  '/recipe-files',
  recipeUpload.single('file'),
  RecipeFileController.store
);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

routes.get('/foods', FoodController.index);
routes.post('/foods', FoodController.store);
routes.put('/foods/:id', FoodController.update);
routes.delete('/foods/:id', FoodController.delete);

const foods = '/foods/:foodId';
routes.get(`/nutrition-facts`, NutritionFactController.index);
routes.use(foods, foodMiddleware);
routes.post(`${foods}/nutrition-facts`, NutritionFactController.store);
routes.put(`${foods}/nutrition-facts/:id`, NutritionFactController.update);
routes.delete(`${foods}/nutrition-facts/:id`, NutritionFactController.delete);

routes.get('/recipes', RecipeController.index);
routes.get('/recipes/:id', RecipeController.index);
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
routes.patch(`${diets}/meals`, MealController.bulkStore);
routes.put(`${diets}/meals/:id`, MealController.update);
routes.delete(`${diets}/meals/:id`, MealController.delete);

const meals = `${diets}/meals/:mealId`;
routes.use(meals, mealMiddleware);

routes.get(`${meals}/dishes`, DishController.index);
routes.get(`${meals}/dishes/:id`, DishController.index);
routes.post(`${meals}/dishes`, DishController.store);
routes.put(`${meals}/dishes/:id`, DishController.update);
routes.delete(`${meals}/dishes/:id`, DishController.delete);

const dishes = `${meals}/dishes/:dishId`;
routes.use(dishes, dishMiddleware);

routes.get(`${dishes}/recipes/`, RecipeDishController.index);
routes.post(`${dishes}/recipes/`, RecipeDishController.store);
routes.delete(`${dishes}/recipes/:id`, RecipeDishController.delete);

routes.get(`${dishes}/foods/`, FoodDishController.index);
routes.post(`${dishes}/foods/`, FoodDishController.store);
routes.delete(`${dishes}/foods/:id`, FoodDishController.delete);

export default routes;
