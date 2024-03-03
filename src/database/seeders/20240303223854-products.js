'use strict';
const bcrypt = require('bcrypt');
const password = 'password';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('products', [
      {
        "name": "Xiaomi Redmi 9",
        "brand": "Xiaomi",
        "model": "Redmi 9",
        "price": 10000,
        "color": "red"
      },
      {
        "name": "Samsung Galaxy A12",
        "brand": "Samsung",
        "model": "Galaxy A12",
        "price": 12000,
        "color": "black"
      },
      {
        "name": "iPhone SE",
        "brand": "Apple",
        "model": "SE",
        "price": 25000,
        "color": "white"
      },
      {
        "name": "Motorola Moto G9 Plus",
        "brand": "Motorola",
        "model": "Moto G9 Plus",
        "price": 15000,
        "color": "blue"
      },
      {
        "name": "OnePlus Nord",
        "brand": "OnePlus",
        "model": "Nord",
        "price": 20000,
        "color": "gray"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
