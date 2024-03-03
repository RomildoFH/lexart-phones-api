const Product = require('../models/product');

class ProductService {
  async create(payload) {
    try {
      const response = await Product.create(payload);
      return {type: 201, message: response};
    } catch (error) {
      return {type: 500, message: error.message};
    };
  };

  async edit(id, payload) {
    try {
      const verifyExists = await Product.findByPk(id);
      if (!verifyExists) {
        return {type: 404, message: "Product not found"};
      };

      const response = await Product.edit(payload, { where: { id } });

      if (response && response[0] > 0) {
        return {type: 200, message: "Product updated successfully"};
      };
    } catch (error) {
      return {type: 500, message: error.message};
    };
  };

  async delete(payload) {
    try {
      const verifyExists = await Product.findByPk(payload);
      if (!verifyExists) {
        return {type: 404, message: "Product not found"};
      };

      const response = await Product.destroy({where: {id: payload}});

      return {type: 200, message: `${response} Products deleted successfully`};
    } catch (error) {
      return {type: 500, message: error.message};
    };
  };

  async getProductById(payload) {
    try {
      const response = await Product.findByPk(payload);

      if (!response) {
        return {type: 404, message: "Product not found"};
      };

      return {type: 200, message: response};
    } catch (error) {
      return {type: 500, message: error.message};
    };
  };

  async getProductsAll() {
    try {
      const response = await Product.findAll();

      if (!response) {
        return {type: 404, message: "Products not found"};
      };

      return {type: 200, message: response};
    } catch (error) {
      return {type: 500, message: error.message};
    };
  };
};

module.exports = new ProductService();
