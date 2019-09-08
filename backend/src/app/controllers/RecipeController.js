import * as Yup from 'yup';
import Recipe from '../models/Recipe';

class RecipeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('name field is required'),
      description: Yup.string().required('description field is required'),
      preparation_time: Yup.number()
        .integer()
        .positive()
        .min(1, 'preparation_time field: min value is 1')
        .max(1440, 'preparation_time field: max value is 1440')
        .required('preparation_time field is required'),
      servings: Yup.number()
        .integer()
        .positive()
        .min(1, 'servings field: min value is 1')
        .max(500, 'servings field: max value is 500')
        .required('servings field is required'),
      is_private: Yup.boolean().required('weight field is required'),
      difficulty: Yup.mixed()
        .oneOf(['easy', 'medium', 'hard'])
        .required('difficulty field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const body = { ...req.body, user_id: req.userId };

    const {
      id,
      user_id,
      name,
      description,
      preparation_time,
      servings,
      is_private,
      difficulty,
    } = await Recipe.create(body);

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
}
export default new RecipeController();
