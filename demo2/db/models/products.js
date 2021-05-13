'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    product_name: DataTypes.STRING,
    price: DataTypes.STRING,
    ingridients: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    manufacture_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    unit_id: DataTypes.INTEGER,
    img_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
    timestamps: false,
    underscored:true
  });
  return Products;
};