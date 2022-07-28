'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const passwordPembeli = bcrypt.hashSync("pembeli", bcrypt.genSaltSync(10));
     const passwordPenjual = bcrypt.hashSync("penjual", bcrypt.genSaltSync(10));
     await queryInterface.bulkInsert('Users', [
      {
        role_id: 1,
        name: 'wisnu',
        email: "wisnu@gmail.com",
        password: passwordPembeli,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: 2,
        name: 'rizki',
        email: "rizki@gmail.com",
        password: passwordPenjual,
        createdAt: new Date(),
        updatedAt: new Date(), 
      }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
