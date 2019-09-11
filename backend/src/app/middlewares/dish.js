import Dish from '../models/Dish';

export default async (req, res, next) => {
  // Checks if the dish exists and if it belongs to the current meal

  const { mealId, dishId } = req.params;

  const dish = await Dish.findByPk(dishId);

  if (!dish) return res.status(400).json({ error: 'Dish does not exist' });

  if (dish && Number(dish.meal_id) !== Number(mealId))
    return res
      .status(400)
      .json({ error: 'This dish does not belong to the current meal' });

  return next();
};
