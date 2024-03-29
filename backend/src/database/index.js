import Sequelize from 'sequelize';

import User from '../app/models/User';
import DietPlan from '../app/models/DietPlan';
import Meal from '../app/models/Meal';
import Recipe from '../app/models/Recipe';
import Dish from '../app/models/Dish';
import RecipeDish from '../app/models/RecipeDish';
import Food from '../app/models/Food';
import FoodDish from '../app/models/FoodDish';
import Section from '../app/models/Section';
import NutritionFact from '../app/models/NutritionFact';
import RecipeFile from '../app/models/RecipeFile';
import Ingredient from '../app/models/Ingredient';

import databaseConfig from '../config/database';

const models = [
  User,
  DietPlan,
  Meal,
  Recipe,
  Dish,
  RecipeDish,
  Food,
  FoodDish,
  Section,
  NutritionFact,
  RecipeFile,
  Ingredient,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // esse método que vai fazer a conexao com o DB e carregar os models
    this.connection = new Sequelize(databaseConfig);
    // em this.connection já temos a conexão com a DB feita
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
