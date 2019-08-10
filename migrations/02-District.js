module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'districts',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        prefix: {
          type: Sequelize.STRING,
          allowNull: false
        },
        province_id: {
          type: Sequelize.INTEGER,
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
        indexes: [
          {
            name: 'DistrictsProvinceIdIndex',
            unique: true,
            fields: ['province_id']
          }
        ]
      }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('districts')
  }
}
