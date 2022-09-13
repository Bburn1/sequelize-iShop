'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      underscored: true,

      sequelize,
      modelName: 'Item',
      tableName: 'Items',
    }
  )
  return Item;
};