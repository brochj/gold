module.exports = {
  users: 100,
  recipes: 200,
  sections: 500,
  dietPlans: 200, // >= users
  meals: 600, // >= 2*dietPlans
  dishes: 1200, // >= 2*meals
  RecipeDishes: 2400, // >= 2*dishes
  foods: 200,
};
