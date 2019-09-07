import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('name field is required'),
      email: Yup.string()
        .email('invalid email')
        .required('email field is required'),
      password: Yup.string()
        .min(6, 'password must be at least 6 characters')
        .required('password field is required'),
      birthday: Yup.date().required('birthday field is required'),
      height: Yup.number()
        .integer()
        .positive()
        .min(60, 'height field: min value is 60')
        .max(250, 'height field: max value is 250')
        .required('height field is required'),
      weight: Yup.number()
        .integer()
        .positive()
        .min(20, 'weight field: min value is 20')
        .max(500, 'weight field: max value is 500')
        .required('weight field is required'),
      gender: Yup.mixed()
        .oneOf(['male', 'female'])
        .required('gender field is required'),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));

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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('invalid email'),
      birthday: Yup.date(),
      height: Yup.number()
        .integer()
        .positive()
        .min(60, 'height field: min value is 60')
        .max(250, 'height field: max value is 250'),
      weight: Yup.number()
        .integer()
        .positive()
        .min(20, 'weight field: min value is 20')
        .max(500, 'weight field: max value is 500'),
      gender: Yup.mixed().oneOf(['male', 'female']),
      oldPassword: Yup.string().min(
        6,
        'password must be at least 6 characters'
      ),
      password: Yup.string()
        .min(6, 'password must be at least 6 characters')
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required('please type your new password') : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required('please confirm your new password')
              .oneOf([Yup.ref('password')])
          : field
      ),
    });

    schema
      .validate(req.body)
      .catch(e => res.status(400).json({ error: e.message }));
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    // Verificando se o usario quis trocar de email.
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    // Verificando se o usario quis trocar de senha.
    // Verificando se a senha "antiga" confere com a senha salva no DB
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id,
      name,
      email: changedEmail,
      birthday,
      height,
      weight,
      gender,
    } = await user.update(req.body);

    return res.json({
      id,
      name,
      email: changedEmail,
      birthday,
      height,
      weight,
      gender,
    });
  }
}
export default new UserController();
