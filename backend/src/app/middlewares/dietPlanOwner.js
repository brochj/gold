import DietPlan from '../models/DietPlan';

export default async (req, res, next) => {
  // Checks if the logged user is the diet plan owner

  const dietPlan = await DietPlan.findByPk(req.params.dietPlanId);

  if (!dietPlan)
    return res.status(401).json({ error: 'Diet Plan does not exist' });

  if (dietPlan && dietPlan.user_id !== req.userId)
    return res
      .status(401)
      .json({ error: 'You are not the owner of this diet plan' });

  return next();
};
