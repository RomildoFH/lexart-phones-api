const Product = require('../models/product');

class ProductService {
  async create(payload) {
    try {
      const response = await Product.create(payload);
      return {type: 201, message: response};
    } catch (error) {
      return {type: 500, message: error.message}
    };
  };
};

module.exports = new ProductService();
