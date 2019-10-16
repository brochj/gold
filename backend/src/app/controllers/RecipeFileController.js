import RecipeFile from '../models/RecipeFile';

class RecipeFileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await RecipeFile.create({
      name,
      path,
    });
    return res.json(file);
  }
}

export default new RecipeFileController();
