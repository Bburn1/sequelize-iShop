'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Customer, {foreignKey:'customer_id'})
      Order.belongsToMany(models.Item, {through: 'Items_Orders'})


    }
  }
  Order.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      underscored: true,

      sequelize,
      modelName: 'Order',
      tableName: 'Orders',
    }
  )
  return Order;
};