'use strict';
const {
  Model, Sequelize
} = require('sequelize');
class Product extends Model {

  static init(sequelize) {

    super.init({
      name: Sequelize.STRING,
      brand: Sequelize.STRING,
      model: Sequelize.STRING,
      price: Sequelize.NUMERIC,
      color: Sequelize.STRING,
    },
    {
      sequelize,
      modelName: 'products',
    });
  }
};

module.exports = Product;  