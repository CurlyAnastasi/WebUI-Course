'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderItem.init({
    product_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_items',
    timestamps: false
  });
  OrderItem.removeAttribute('id');
  return OrderItem;
};