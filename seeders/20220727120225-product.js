'use strict';

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
     await queryInterface.bulkInsert('Products', [
      {
        name: 'Sayur Bayam',
        quantity: 10,
        price: 10000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ikan Bawal',
        quantity: 20,
        price: 15000,
        createdAt: new Date(),
        updatedAt: new Date() 
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
