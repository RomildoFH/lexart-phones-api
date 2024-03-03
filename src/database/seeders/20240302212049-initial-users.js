'use strict';
const bcrypt = require('bcrypt');
const password = 'password';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date();
    await queryInterface.bulkInsert('users', [
    {
      name: 'Romildo Silva',
      email: 'romildo.silvafilho1@gmail.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: now,
      updatedAt: now,
    },
    {
      name: 'Jhon Doe',
      email: 'jhondoe@gmail.com',
      password: hashedPassword,
      role: 'customer',
      createdAt: now,
      updatedAt: now,
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
