import * as Yup from 'yup';
import User from '../models/User';
import DietPlan from '../models/DietPlan';
import Meal from '../models/Meal';

class DietPlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('title field is required'),
      calorie: Yup.number()
        .integer()
        .positive()
        .min(1, 'calorie field: min value is 1')
        .max(99999, 'calorie field: max value is 99999')
        .required('calorie field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    if (!req.params.id)
      return res.status(400).json({ error: 'missing diet plan id' });

    const body = { ...req.body, diet_plan_id: req.params.id };

    const { id, diet_plan_id, calorie, title } = await Meal.create(body);

    return res.json({
      id,
      diet_plan_id,
      calorie,
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

    // TODO fazer essa por findByPk
    const meal = await Meal.findOne({
      where: { diet_plan_id: req.params.id, id: req.params.mealId },
    });

    // TODO - fazer mais verificacao, se o usuario é o doono do diet plan
    if (!meal) return res.status(401).json({ error: 'Meal does not exist' });

    const { id, diet_plan_id, calorie, title } = await meal.update({
      ...req.body,
    });

    return res.json({
      id,
      diet_plan_id,
      calorie,
      title,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;

    const meals = await Meal.findAll({
      where: { diet_plan_id: id },
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
    const { id, mealId } = req.params;
    const mealExists = await Meal.findByPk(mealId);

    if (!mealExists)
      return res.status(400).json({ error: 'Meal does not exist' });
    // TODO verificar se existe
    // const meal = await Meal.findOne({
    //   where: { diet_plan_id: id, id: mealId },
    // });

    // if (!meal)
    //   return res
    //     .status(401)
    //     .json({ error: 'You do not have permission to delete this diet plan' });

    await mealExists.destroy();
    return res.send();
  }
}
export default new DietPlanController();
