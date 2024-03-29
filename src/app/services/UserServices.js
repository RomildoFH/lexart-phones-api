const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserService {

  async createUser(payload) {
    try {
      const {email} = payload;
      const existing = await User.findOne({where: {email}});

      if (existing) {
        return {type: 409, message: 'Email não disponível'};
      }

      const hashedPassword = await bcrypt.hash(payload.password, 10);
      payload.password = hashedPassword;      

      payload.role = 'customer';

      const response = await User.create(payload);

      delete response.dataValues.password;
      
      return {type: 201, message: response};
    } catch (error) {
      console.log('erro da query', error);
      return { type: 500, message: error.message };
    };
  };

  async createAdmin(payload) {
    try {
      const {email} = payload;
      const existing = await User.findOne({where: {email}});
      if (existing) {
        return {type: 400, message: 'Email não disponível'};
      }
      payload.role = 'admin';
      const response = await User.create(payload);

      delete response.dataValues.password;
      
      return {type: 201, message: response};
    } catch (error) {
      console.log('erro da query', error);
      return { type: 500, message: error };
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
      console.log('antes da query');
      console.log(User)
      const response = await User.findAll({attributes: { exclude: ["password"]}});
      console.log('após da query', response);
      if (response?.length > 0) {
        return {type: 200, message: response};
      } else {
        return {type: 200, message: "Nenhum usuário encontrado"};
      }
    } catch (error) {
      console.log('erro da query', error);
      return { type: 500, message: error };
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
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return { type: 404, message: "E-mail ou senha inválidos" };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            return { type: 200, message: { id: user.id, name: user.name, role: user.role } };
        } else {
            return { type: 404, message: "E-mail ou senha inválidos" };
        }
    } catch (error) {
      return { type: 500, message: error.message };
    }
  };
  
};

module.exports = new UserService();
