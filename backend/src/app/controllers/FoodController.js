import * as Yup from 'yup';
import Food from '../models/Food';

class FoodController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('food name field is required'),
      brand: Yup.string(),
      description: Yup.string(),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const { id, name, brand, description } = await Food.create(req.body);

    return res.json({ id, name, brand, description });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('food name field is required'),
      brand: Yup.string(),
      description: Yup.string(),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const food = await Food.findByPk(req.params.id);

    if (!food) return res.status(400).json({ error: 'Food does not exist' });

    const { id, name, brand, description } = await food.update(req.body);

    return res.json({ id, name, brand, description });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const food = await Food.findAll({
      order: ['id'],
      attributes: ['id', 'name', 'brand', 'description'],
      limit: 10,
      offset: (page - 1) * 10,
      // include: [
      //   {
      //     model: NutritionFact,
      //     as: 'meal',
      //     attributes: ['energy', 'carbohydrate', 'protein', 'total_fat'],
      //   },
      // ],
    });

    return res.status(200).json(food);
  }

  async delete(req, res) {
    const food = await Food.findByPk(req.params.id);

    if (!food) return res.status(400).json({ error: 'Food does not exist' });

    await food.destroy();
    return res.send();
  }
}
export default new FoodController();
