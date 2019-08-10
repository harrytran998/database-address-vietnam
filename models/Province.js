import { getJsonObject } from '../helpers/toJsonObject'

export default (sequelize, DataTypes) => {
  const Province = sequelize.define(
    'provinces',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      code: {
        type: DataTypes.STRING(5),
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  )
  Province.prototype.toJSON = function() {
    return getJsonObject(this.get(), ['code'])
  }
  return Province
}
