import Sequelize, { Op } from 'sequelize'
import { defaults } from 'pg'
import { getDBConf } from '../libs/db'
import { development } from '../config/configDB'

// this is needed to prevent sequelize from converting integers to strings, when model definition isn't clear
// like in case of the key totalOrders and raw query (like User.get....())
defaults.parseInt8 = true

const dbConfig = getDBConf('database_name')
console.log('\x1b[36mDatabase Name: ' + dbConfig.database)
console.log('\x1b[34mHost: ' + dbConfig.host)
console.log('\x1b[36mUsername: ' + dbConfig.username)
console.log('\x1b[34mPassword: ' + dbConfig.password)

if (development.options.pool) {
  if (development.options.pool.min) {
    development.options.pool.min = parseInt(development.options.pool.min, 10)
  }
  if (development.options.pool.max) {
    development.options.pool.max = parseInt(development.options.pool.max, 10)
  }
  if (development.options.pool.acquire) {
    development.options.pool.acquire = parseInt(development.options.pool.acquire, 10)
  }
}

export const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  ...development.options
})

export const setupModels = client => {
  const m = {} // models
  const modelsName = [
    'District',
    'Province',
    'Ward' //
  ]
  modelsName.forEach(model => {
    m[model] = client.import(`${__dirname}/${model}`)
  })

  /**
   * Relationships between the models
   */
  m.Ward.belongsTo(m.District, { foreignKey: 'district_id' })
  m.District.hasMany(m.Ward, { foreignKey: 'district_id' })

  m.District.belongsTo(m.Province, { foreignKey: 'province_id' })
  m.Province.hasMany(m.District, { foreignKey: 'province_id' })

  Object.keys(m).forEach(modelName => m[modelName].associate && m[modelName].associate(m))
  return m
}

const models = setupModels(sequelize)

export const Opration = Op

export default models
