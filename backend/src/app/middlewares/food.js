import Food from '../models/Food';

export default async (req, res, next) => {
  // Checks if the food exists
  const { foodId } = req.params;

  const food = await Food.findByPk(foodId);

  if (!food) return res.status(400).json({ error: 'Food does not exist' });

  return next();
};
