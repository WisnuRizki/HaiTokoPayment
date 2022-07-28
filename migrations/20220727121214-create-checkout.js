'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Checkouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      paymentCode: {
        type: Sequelize.STRING
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      totalQuantity: {
        type: Sequelize.INTEGER
      },
      totalPrice: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Checkouts');
  }
};