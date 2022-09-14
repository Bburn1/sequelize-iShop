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
      Item.belongsTo(models.Category, { foreignKey: 'category_id' })
      Item.belongsTo(models.Type, { foreignKey: 'type_id' })
      Item.belongsTo(models.Brand, { foreignKey: 'brand_id' })
      Item.belongsTo(models.IModel, { foreignKey: 'model_id' })
      Item.belongsTo(models.Store, { foreignKey: 'store_id' })

      Item.belongsToMany(models.Order, { through: 'Items_Orders' })



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
      store_id: {
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