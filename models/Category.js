const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns// adding id and name columns for hte category model //
    id: {
      type: DataTypes.INTEGER,
      allownull: false,
      primarykey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allownull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
