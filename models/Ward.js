export default (sequelize, DataTypes) => {
  const Ward = sequelize.define(
    'wards',
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
      prefix: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'districts',
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
  Ward.prototype.toJSON = function() {
    return getJsonObject(this.get(), ['district_id'])
  }
  return Ward
}
