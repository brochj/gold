import * as Yup from 'yup';
import DietPlan from '../models/DietPlan';
import Meal from '../models/Meal';

class DishController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('title field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const { dietPlanId } = req.params;
    const dietPlanExists = await DietPlan.findByPk(dietPlanId);

    if (!dietPlanExists)
      return res.status(400).json({ error: 'Diet plan does not exist' });

    const meal = await DietPlan.findOne({
      where: { id: dietPlanId, user_id: req.userId },
    });

    if (!meal)
      return res
        .status(401)
        .json({ error: 'You are not the owner of this diet plan' });

    const body = { ...req.body, meal_id: dietPlanId };

    const { id, meal_id, title } = await Meal.create(body);

    return res.json({
      id,
      meal_id,
      title,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      calorie: Yup.number()
        .integer()
        .positive()
        .min(1, 'calorie field: min value is 1')
        .max(99999, 'calorie field: max value is 99999'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const mealexists = await Meal.findByPk(req.params.id);

    if (!mealexists)
      return res.status(401).json({ error: 'Meal does not exist' });

    const meal = await Meal.findOne({
      where: { diet_plan_id: req.params.dietPlanId, id: req.params.id },
      include: [
        {
          model: DietPlan,
          as: 'diet_plan',
          attributes: ['user_id'],
        },
      ],
    });

    if (meal.diet_plan.user_id !== req.userId)
      return res
        .status(401)
        .json({ error: 'You do not have permission to delete this meal' });

    const { id, diet_plan_id, calorie, title } = await meal.update(req.body);

    return res.json({ id, diet_plan_id, calorie, title });
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const { dietPlanId } = req.params;

    const dietPlanExists = await DietPlan.findByPk(dietPlanId);

    if (!dietPlanExists)
      return res.status(400).json({ error: 'Diet plan does not exist' });

    const meals = await Meal.findAll({
      where: { diet_plan_id: dietPlanId },
      order: ['id'],
      attributes: ['id', 'calorie', 'title'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: DietPlan,
          as: 'diet_plan',
          attributes: ['id'],
        },
      ],
    });

    return res.status(200).json(meals);
  }

  async delete(req, res) {
    const { id, dietPlanId } = req.params;
    const mealexists = await Meal.findByPk(id);

    if (!mealexists)
      return res.status(401).json({ error: 'Meal does not exist' });

    const meal = await Meal.findOne({
      where: { id, diet_plan_id: dietPlanId },
    });

    if (!meal)
      return res
        .status(401)
        .json({ error: 'You do not have permission to delete this meal' });

    await meal.destroy();
    return res.send();
  }
}
export default new DishController();
