'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
          IModel.belongsTo(models.Brand, { foreignKey: 'brand_id' })
          IModel.hasMany(models.Item, { foreignKey: 'model_id' })


    }
  }
  IModel.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      description: DataTypes.TEXT,
    },
    {
      underscored: true,
      sequelize,
      modelName: 'IModel',
      tableName: 'Models',
    }
  )
  return IModel;
};