import * as Yup from 'yup';
import Dish from '../models/Dish';
import Food from '../models/Food';
import FoodDish from '../models/FoodDish';

class RecipeDishController {
  async store(req, res) {
    const schema = Yup.object().shape({
      food_id: Yup.string().required('food_id field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const foodExists = await Food.findByPk(req.body.food_id);

    if (!foodExists)
      return res.status(400).json({ error: 'Food does not exist' });

    const foodDishExists = await FoodDish.findOne({
      where: {
        food_id: req.body.food_id,
        dish_id: req.params.dishId,
      },
    });

    if (foodDishExists)
      return res.status(400).json({ error: 'This dish already has this food' });

    const body = {
      food_id: req.body.food_id,
      dish_id: req.params.dishId,
    };

    const { id, food_id, dish_id } = await FoodDish.create(body);

    return res.json({ id, food_id, dish_id });
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
          model: Food,
          as: 'foods',
          attributes: ['id', 'name', 'brand'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.status(200).json(dishes);
  }

  async delete(req, res) {
    const { id: food_id } = req.params;

    const foodDish = await FoodDish.findOne({
      where: { food_id },
    });

    if (!foodDish)
      return res
        .status(400)
        .json({ error: 'This dish does not have this food' });

    await foodDish.destroy();
    return res.send();
  }
}
export default new RecipeDishController();
