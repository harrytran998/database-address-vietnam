module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'wards',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        prefix: {
          type: Sequelize.STRING(10),
          allowNull: false
        },
        district_id: {
          type: Sequelize.INTEGER,
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
        indexes: [
          {
            name: 'WardsDistrictsIdIndex',
            unique: true,
            fields: ['district_id']
          }
        ]
      }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('wards')
  }
}
