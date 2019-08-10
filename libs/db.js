import pgConnectionString from 'pg-connection-string'
import { has } from 'lodash'
import { development } from '../config/config'

/** Retrieve configuration paratemters of a given database.
 *
 * @param {string} name of the key in the configuration that contains
 *  the database parameters. An error is thrown if there's no section
 *  with such name.
 * @return an object with the keys `database`, `username`, `password`,
 *  `host`, and `port`. The key `port` is the only optional one and
 *  defaults to 5432.
 */
export function getDBConf(name) {
  if (!has(development, ['url'])) {
    throw new Error(`Configuration missing url connect string`)
  }
  const urlConnectionString = process.env.DB_CONNECTION_STRING_DEV
  let dbConfig = parseDBUrl(urlConnectionString)
  if (name === 'database_name') {
    dbConfig = { ...dbConfig }
  }
  return dbConfig
}

/** Get a config object from an URL
 *
 * @param {string} url of a database
 */
export function parseDBUrl(url) {
  const { database, user, password, host, port, dialect } = pgConnectionString.parse(url)
  return { database, username: user, password, host, port: port || 5432, dialect: dialect || 'postgres' }
}

/** Assemble an URL from database connection options.
 *
 * @param {string} section of the configuration file that will be read
 *  to assemble the URL. The configuration section MUST have the
 *  following fields: `database`, `username`, `password`
 *  `options.host` and optionally `options.port`.
 */
export function getDBUrl(section) {
  const { database, username, password, host, port } = getDBConf(section)
  return `postgresql://${username}:${password}@${host}:${port}/${database}`
}
