import * as Yup from 'yup';
import Dish from '../models/Dish';
import RecipeDish from '../models/RecipeDish';
import Recipe from '../models/Recipe';

class RecipeDishController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipe_id: Yup.string().required('recipe_id field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const recipeExists = await Recipe.findByPk(req.body.recipe_id);

    if (!recipeExists)
      return res.status(400).json({ error: 'Recipe does not exist' });

    const recipeDishExists = await RecipeDish.findOne({
      where: {
        recipe_id: req.body.recipe_id,
        dish_id: req.params.dishId,
      },
    });

    if (recipeDishExists)
      return res
        .status(400)
        .json({ error: 'This dish already has this recipe' });

    const body = {
      recipe_id: req.body.recipe_id,
      dish_id: req.params.dishId,
    };

    const { id, recipe_id, dish_id } = await RecipeDish.create(body);

    return res.json({ id, recipe_id, dish_id });
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const { dishId } = req.params;

    const dishes = await Dish.findOne({
      where: { id: dishId },
      order: ['id'],
      attributes: ['id', 'title', 'meal_id'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Recipe,
          as: 'recipes',
          attributes: [
            'id',
            'name',
            'preparation_time',
            'servings',
            'difficulty',
          ],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.status(200).json(dishes);
  }

  async delete(req, res) {
    const { id: recipe_id } = req.params;

    const recipeDish = await RecipeDish.findOne({
      where: { recipe_id },
    });

    if (!recipeDish)
      return res
        .status(400)
        .json({ error: 'This dish does not have this recipe' });

    await recipeDish.destroy();
    return res.send();
  }
}
export default new RecipeDishController();
