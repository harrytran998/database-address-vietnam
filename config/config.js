require('../libs/load-env')

module.exports = {
  development: {
    url: process.env.DB_CONNECTION_STRING_DEV,
    options: {
      pool: {
        min: 5,
        max: 10,
        acquire: 1200000
      },
      logging: true
    }
  },
  test: {
    url: process.env.DB_CONNECTION_STRING_DEV,
    options: {
      pool: {
        min: 5,
        max: 10,
        acquire: 1200000
      },
      logging: false
    }
  },
  production: {
    url: process.env.DB_CONNECTION_STRING_DEV,
    options: {
      pool: {
        min: 5,
        max: 10,
        acquire: 1200000
      },
      logging: false
    }
  }
}
