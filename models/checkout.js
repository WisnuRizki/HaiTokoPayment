'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product,{
        foreignKey: 'product_id',
        as: 'product'
      })
    }
  }
  Checkout.init({
    user_id: DataTypes.INTEGER,
    paymentCode: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    totalQuantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Checkout',
  });
  return Checkout;
};