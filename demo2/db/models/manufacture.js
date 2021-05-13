'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manufacture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Manufacture.init({
    manufacture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'manufacture',
    timestamps: false
  });
  return Manufacture;
};