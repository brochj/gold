import * as Yup from 'yup';
import Recipe from '../models/Recipe';
import User from '../models/User';
import DietPlan from '../models/DietPlan';

class DietPlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      objective: Yup.mixed()
        .oneOf(['gainMuscle', 'weightLoss', 'maintainWeight'])
        .required('objective field is required'),
      calorie_intake: Yup.number()
        .integer()
        .positive()
        .min(1, 'calorie_intake field: min value is 1')
        .max(99999, 'calorie_intake field: max value is 99999')
        .required('calorie_intake field is required'),
      calorie_goal: Yup.number()
        .integer()
        .positive()
        .min(1, 'calorie_goal field: min value is 1')
        .max(99999, 'calorie_goal field: max value is 20000')
        .required('calorie_goal field is required'),
      physical_activity: Yup.mixed()
        .oneOf(['light', 'moderate', 'high', 'intense'])
        .required('physical_activity field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const body = { ...req.body, user_id: req.userId };

    const {
      id,
      user_id,
      objective,
      difficulty,
      calorie_goal,
      calorie_intake,
      physical_activity,
    } = await DietPlan.create(body);

    return res.json({
      id,
      user_id,
      objective,
      difficulty,
      calorie_goal,
      calorie_intake,
      physical_activity,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      objective: Yup.mixed()
        .oneOf(['gainMuscle', 'weightLoss', 'maintainWeight'])
        .required('objective field is required'),
      calorie_intake: Yup.number()
        .integer()
        .positive()
        .min(1, 'calorie_intake field: min value is 1')
        .max(99999, 'calorie_intake field: max value is 99999')
        .required('calorie_intake field is required'),
      calorie_goal: Yup.number()
        .integer()
        .positive()
        .min(1, 'calorie_goal field: min value is 1')
        .max(99999, 'calorie_goal field: max value is 20000')
        .required('calorie_goal field is required'),
      physical_activity: Yup.mixed()
        .oneOf(['light', 'moderate', 'high', 'intense'])
        .required('physical_activity field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const dietPlan = await DietPlan.findOne({
      where: { user_id: req.userId, id: req.params.id },
    });

    if (!dietPlan)
      return res
        .status(401)
        .json({ error: 'You do not have permission to change this diet plan' });

    const {
      id,
      user_id,
      name,
      description,
      preparation_time,
      servings,
      is_private,
      difficulty,
    } = await dietPlan.update({ ...req.body });

    return res.json({
      id,
      user_id,
      name,
      description,
      preparation_time,
      servings,
      is_private,
      difficulty,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const dietPlans = await DietPlan.findAll({
      where: { user_id: req.userId },
      order: ['id'],
      attributes: [
        'id',
        'objective',
        'difficulty',
        'calorie_goal',
        'calorie_intake',
        'physical_activity',
      ],
      limit: 10,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.status(200).json(dietPlans);
  }

  async delete(req, res) {
    const { id } = req.params;
    const dietPlanExists = await DietPlan.findByPk(id);

    if (!dietPlanExists)
      return res.status(400).json({ error: 'Diet plan does not exist' });

    const dietPlan = await DietPlan.findOne({
      where: { user_id: req.userId, id: req.params.id },
    });

    if (!dietPlan)
      return res
        .status(401)
        .json({ error: 'You do not have permission to delete this diet plan' });

    await dietPlan.destroy();
    return res.send();
  }
}
export default new DietPlanController();
