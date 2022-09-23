'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
            Brand.hasMany(models.IModel, { foreignKey: 'brand_id' })
            Brand.hasMany(models.Item, { foreignKey: 'brand_id' })


    }
  }
  Brand.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: DataTypes.TEXT,
    },
    {
      underscored: true,

      sequelize,
      modelName: 'Brand',
      tableName: 'Brands',
    }
  )
  return Brand;
};