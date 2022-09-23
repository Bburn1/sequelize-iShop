'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
            Type.hasMany(models.Item, { foreignKey: 'type_id' })

    }
  }
  Type.init(
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
      modelName: 'Type',
      tableName: 'Types',
    }
  )
  return Type;
};