import { getJsonObject } from '../helpers/toJsonObject'

export default (sequelize, DataTypes) => {
  const District = sequelize.define(
    'districts',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prefix: {
        type: DataTypes.STRING,
        allowNull: false
      },
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'provinces',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    {
      timestamps: false
    }
  )
  District.prototype.toJSON = function() {
    return getJsonObject(this.get(), ['province_id'])
  }
  return District
}
