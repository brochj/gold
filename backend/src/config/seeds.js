module.exports = {
  users: 100,
  recipes: 200,
  sections: 500,
  dietPlans: 200, // >= users
  meals: 600, // >= 2*dietPlans
  dishes: 1200, // >= 2*meals
  recipeDishes: 2400, // >= 2*dishes
  foods: 200,
  foodDishes: 2400, // >= 2*dishes
  nutritionFacts: 200, // == foods
};
