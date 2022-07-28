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
     await queryInterface.bulkInsert('Balances', [
      {
        user_id: 1,
        amount: 1000000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        amount: 0,
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
