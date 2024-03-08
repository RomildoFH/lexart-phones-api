const UserService = require('../services/UserServices');
const { createJWT } = require('../utils/jwtFunctions');

class UserController {

  async create(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({message: "Dados inválidos"});
    };

    const { type, message } = await UserService.createUser(req.body);

    return res.status(type).json(message);
  };

  async createAdmin(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({message: "Dados inválidos"});
    };

    const { type, message } = await UserService.createAdmin(req.body);

    return res.status(type).json(message);
  };

  async getAll(req, res) {
    const { type, message } = await UserService.getAll();

    if (req.body.user.role !== 'admin') {
      return res.status(401).json({message: 'Você não tem permissão para acessar'});
    }

    return res.status(type).json(message);
  };

  async getById(req, res) {
    const { id } = req.params;
    const { type, message } = await UserService.getUserById(id);

    return res.status(type).json(message);
  };

  async getByEmail(req, res) {
    const { email } = req.params;
    const { type, message } = await UserService.getUserByEmail(email);

    return res.status(type).json(message);
  };

  async delete(req, res) {
    const { id } = req.params;
    const { type, message } = await UserService.deleteUser(id);

    return res.status(type).json(message);
  };

  async update(req, res) {
    const { id } = req.params;
    req.body.id = id;
    if (!id) {
      return res.status(400).json({message: 'Necessário informar um id válido.'});
    }
    const { type, message } = await UserService.updateUser(req.body);

    return res.status(type).json(message);
  };

  async login(req, res) {
    const { email, password } = req.body;
    const { type, message } = await UserService.login({ email, password });
    if (type === 200) {
      const token = createJWT(message)
      return res.status(type).json({...message, token: token});
    }
    return res.status(type).json({message: message});
  };
};

module.exports = new UserController();