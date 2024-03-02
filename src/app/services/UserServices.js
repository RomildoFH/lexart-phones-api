const User = require('../models/user');

class UserService {

  async createUser(payload) {
    try {
      const {email} = payload;
      const existing = await User.findOne({where: {email}});
      if (existing) {
        return {type: 400, message: 'Email não disponível'};
      }
      const response = await User.create(payload);

      delete response.dataValues.password;
      
      return {type: 201, message: response};
    } catch (error) {
      return { type: 500, message: error.message };
    };
  };

  async getUserByEmail(payload) {
    try {
      const { email } = payload;
      const response = await User.findOne({ where: { email }});
      if (response) {
        return {type: 200, message: response};
      } else {
        return {type: 200, message: "Nenhum usuário encontrado"};
      }
    } catch (error) {
      return { type: 500, message: error.message };
    }
  };

  async getUserById(payload) {
    try {
      const response = await User.findOne({ where: { id: payload }, attributes: { exclude: ["password"]}});
      if (response) {
        return {type: 200, message: response};
      } else {
        return {type: 200, message: "Nenhum usuário encontrado"};
      }
    } catch (error) {
      return { type: 500, message: error.message };
    }
  };

  async getAll() {
    try {
      const response = await User.findAll({attributes: { exclude: ["password"]}});
      if (response?.length > 0) {
        return {type: 200, message: response};
      } else {
        return {type: 200, message: "Nenhum usuário encontrado"};
      }
    } catch (error) {
      return { type: 500, message: error.message };
    }
  };

  async deleteUser(payload) {
    try {
      const existing = await User.findOne({where: {id: payload}});
      if (!existing) {
        return {type: 409, message: 'Usuário inexistente'};
      }
      await User.destroy({ where: { id: payload }});
      return {type: 200, message: "Usuário deletado com sucesso"};
    } catch (error) {
      return { type: 500, message: error.message };
    }
  };

  async updateUser(payload) {
    try {
      const { id } = payload;
      const existing = await User.findOne({where: {id}});
      if (!existing) {
        return {type: 404, message: 'Usuário inexistente'};
      }
      const response = await User.update(payload, { where: { id } });

      if ( response[0] > 0) {
        const updated = await User.findOne({where: {id}});
        delete updated.dataValues.password;
        return {type: 200, message: updated};
      } else {
        return {type: 404, message: 'Não foi possível atualizar usuário'};
      }

    } catch (error) {
      return { type: 500, message: error.message };
    };
  };

  async login(payload) {
    try {
      const { email, password } = payload;
      const response = await User.findOne({ where: { email, password }, attributes: { exclude: ["password", "name", "phone", "email", "createdAt", "updatedAt"]}});
      if (response) {
        return {type: 200, message: response};
      } else {
        return {type: 200, message: "E-mail ou senha inválidos"};
      }
    } catch (error) {
      return { type: 500, message: error.message };
    }
  };
  
};

module.exports = new UserService();
