import * as Yup from 'yup';
import Meal from '../models/Meal';
import Dish from '../models/Dish';
import Food from '../models/Food';
import Recipe from '../models/Recipe';
import RecipeFile from '../models/RecipeFile';

class DishController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('title field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const { mealId } = req.params;

    const mealExists = await Meal.findByPk(mealId);

    if (!mealExists)
      return res.status(400).json({ error: 'Meal does not exist' });

    const body = { ...req.body, meal_id: mealId };

    const { id, meal_id, title } = await Dish.create(body);

    return res.json({
      id,
      meal_id,
      title,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required('title field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const { id: dishId, mealId } = req.params;

    const mealExists = await Meal.findByPk(mealId);

    if (!mealExists)
      return res.status(400).json({ error: 'Meal does not exist' });

    const dish = await Dish.findOne({ where: { meal_id: mealId, id: dishId } });

    if (!dish) return res.status(400).json({ error: 'Dish does not exist' });

    const { id, meal_id, title } = await dish.update(req.body);

    return res.json({ id, meal_id, title });
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const { mealId, id } = req.params;

    if (id) {
      const dish = await Dish.findOne({
        where: { id },
        order: ['id'],
        attributes: ['id', 'meal_id', 'title'],
        limit: 10,
        offset: (page - 1) * 10,
        include: [
          {
            model: Meal,
            as: 'meal',
            attributes: ['title', 'calorie'], // TODO colocar o time
          },
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
            through: { attributes: [] },
            include: [
              {
                model: RecipeFile,
                as: 'cover',
                attributes: ['id', 'url', 'path'],
              },
            ]
          },
          {
            model: Food,
            as: 'foods',
            attributes: ['id', 'name', 'brand'],
            through: { attributes: [] },
          },
        ],
      });

      if (!dish) return res.status(400).json({ error: 'Dish does not exist' });

      return res.status(200).json(dish);
    }

    const dishes = await Dish.findAll({
      where: { meal_id: mealId },
      order: ['id'],
      attributes: ['id', 'meal_id', 'title'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Meal,
          as: 'meal',
          attributes: ['title', 'calorie'], // TODO colocar o time
        },
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
          through: { attributes: [] },
          include: [
            {
              model: RecipeFile,
              as: 'cover',
              attributes: ['id', 'url', 'path'],
            },
          ]
        },
        {
          model: Food,
          as: 'foods',
          attributes: ['id', 'name', 'brand'],
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).json(dishes);
  }

  async delete(req, res) {
    const { id, mealId } = req.params;

    const mealExists = await Meal.findByPk(mealId);

    if (!mealExists)
      return res.status(400).json({ error: 'Meal does not exist' });

    const dish = await Dish.findByPk(id);

    if (!dish) return res.status(401).json({ error: 'Dish does not exist' });

    await dish.destroy();
    return res.send();
  }
}
export default new DishController();
