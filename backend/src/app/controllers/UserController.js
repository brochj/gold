import User from '../models/User';

class UserController {
  async store(req, res) {
    // Verificando se ja existe usuário com email cadastrado
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Salvando usuario no banco de dados
    const {
      id,
      name,
      email,
      birthday,
      height,
      weight,
      gender,
    } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      birthday,
      height,
      weight,
      gender,
    });
  }
}
export default new UserController();
