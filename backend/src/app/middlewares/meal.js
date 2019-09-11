import Meal from '../models/Meal';

export default async (req, res, next) => {
  // Checks if the meal exists and if it belongs to the current diet plan

  const { mealId, dietPlanId } = req.params;

  const meal = await Meal.findByPk(mealId);

  if (!meal) return res.status(400).json({ error: 'Meal does not exist' });

  if (meal && Number(meal.diet_plan_id) !== Number(dietPlanId))
    return res
      .status(400)
      .json({ error: 'This meal does not belong to the current diet plan' });

  return next();
};
