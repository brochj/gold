import * as Yup from 'yup';
import Food from '../models/Food';
import NutritionFact from '../models/NutritionFact';

class NutritionFactController {
  async store(req, res) {
    const schema = Yup.object().shape({
      iron: Yup.number('iron field must be a number'),
      fiber: Yup.number('fiber field must be a number'),
      energy: Yup.number('energy field must be a number').required(
        'energy field is required'
      ),
      sodium: Yup.number('sodium field must be a number'),
      sugars: Yup.number('sugars field must be a number'),
      calcium: Yup.number('calcium field must be a number'),
      proteins: Yup.number('proteins field must be a number'),
      total_fat: Yup.number('total_fat field must be a number'),
      trans_fat: Yup.number('trans_fat field must be a number'),
      vitamin_a: Yup.number('vitamin_a field must be a number'),
      vitamin_c: Yup.number('vitamin_c field must be a number'),
      vitamin_d: Yup.number('vitamin_d field must be a number'),
      potassium: Yup.number('potassium field must be a number'),
      cholesterol: Yup.number('cholesterol field must be a number'),
      carbohydrate: Yup.number('carbohydrate field must be a number'),
      custom_value: Yup.number('custom_value field must be a number'),
      saturated_fat: Yup.number('saturated_fat field must be a number'),
      serving_value: Yup.number(
        'serving_value field must be a number'
      ).required('serving_value field is required'),
      serving_unit: Yup.string().required('serving_unit field is required'),
      custom_unit: Yup.string('custom_unit field must be a string'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const food = await Food.findByPk(req.params.foodId);
    if (!food) return res.status(400).json({ error: 'Food does not exist' });

    const nutriFactsExists = await NutritionFact.findOne({
      where: { food_id: req.params.foodId },
    });
    if (nutriFactsExists)
      return res
        .status(400)
        .json({ error: 'This food already has nutrition facts' });

    const nutritionFact = await NutritionFact.create({
      food_id: req.params.foodId,
      ...req.body,
    });

    return res.json(nutritionFact);
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
export default new NutritionFactController();
