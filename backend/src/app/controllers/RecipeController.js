import * as Yup from 'yup';
import Recipe from '../models/Recipe';
import Section from '../models/Section';
import User from '../models/User';
import RecipeFile from '../models/RecipeFile';
import Ingredient from '../models/Ingredient';
import Food from '../models/Food';

class RecipeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cover_id: Yup.number(),
      name: Yup.string()
        .min(2, 'Recipe name must be at least 2 characters')
        .required('name field is required'),
      description: Yup.string(),
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

    const { sections, ingredients, ...recipeBasicInfo } = req.body;

    const { id } = await Recipe.create({
      user_id: req.userId,
      ...recipeBasicInfo,
    });

    await ingredients.forEach(async ingredient => {
      await Ingredient.create({
        ...ingredient,
        recipe_id: id,
      });
    });

    await sections.forEach(async section => {
      await Section.create({
        ...section,
        recipe_id: id,
      });
    });

    const recipe = await Recipe.findOne({
      where: { is_private: false, id },
      attributes: [
        'id',
        'name',
        'preparation_time',
        'servings',
        'description',
        'difficulty',
      ],
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name'],
        },
        {
          model: RecipeFile,
          as: 'cover',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.json(recipe);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Recipe name must be at least 2 characters')
        .required('name field is required'),
      description: Yup.string(),
      preparation_time: Yup.number()
        .integer()
        .positive()
        .min(1, 'preparation_time field: min value is 1')
        .max(1440, 'preparation_time field: max value is 1440'),
      servings: Yup.number()
        .integer()
        .positive()
        .min(1, 'servings field: min value is 1')
        .max(500, 'servings field: max value is 500'),
      is_private: Yup.boolean(),
      difficulty: Yup.mixed().oneOf(['easy', 'medium', 'hard']),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

    const recipe = await Recipe.findOne({
      where: { user_id: req.userId, id: req.params.id },
    });

    if (!recipe)
      return res
        .status(401)
        .json({ error: 'You do not have permission to change this recipe' });

    const {
      id,
      user_id,
      name,
      description,
      preparation_time,
      servings,
      is_private,
      difficulty,
    } = await recipe.update({ ...req.body });

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

    const { id } = req.params;

    if (id) {
      const recipe = await Recipe.findOne({
        where: { is_private: false, id },
        attributes: [
          'id',
          'name',
          'preparation_time',
          'servings',
          'description',
          'difficulty',
        ],
        include: [
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'name'],
          },
          {
            model: RecipeFile,
            as: 'cover',
            attributes: ['id', 'url', 'path'],
          },
          {
            model: Section,
            as: 'sections',
            attributes: ['id', 'title', 'order', 'steps'],
            required: false,
          },
          {
            model: Ingredient,
            where: { recipe_id: id },
            as: 'ingredients',
            attributes: ['quantity', 'unit', 'preparation', 'tip'],
            required: false,
            include: [
              {
                model: Food,
                as: 'food',
                attributes: ['id', 'name', 'brand'],
              },
            ],
          },
          // {
          //   model: Food,
          //   through: {
          //     model: Ingredient,
          //     attributes: ['quantity', 'unit', 'preparation', 'tip'],
          //     as: 'indredient',
          //   },
          //   as: 'ingre',
          //   attributes: ['name', 'brand'],
          // },
        ],
      });

      return res.status(200).json(recipe);
    }

    const recipes = await Recipe.findAll({
      where: { is_private: false },
      order: ['id'],
      attributes: [
        'id',
        'name',
        'preparation_time',
        'servings',
        'difficulty',
        'cover_id',
      ],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name'],
        },
        {
          model: RecipeFile,
          as: 'cover',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    return res.status(200).json(recipes);
  }

  async delete(req, res) {
    const { id } = req.params;
    const recipeExists = await Recipe.findByPk(id);

    if (!recipeExists)
      return res.status(400).json({ error: 'Recipe does not exist' });

    const recipe = await Recipe.findOne({
      where: { user_id: req.userId, id },
    });

    if (!recipe)
      return res
        .status(401)
        .json({ error: 'You do not have permission to delete this recipe' });

    await recipe.destroy();
    return res.send();
  }
}
export default new RecipeController();
