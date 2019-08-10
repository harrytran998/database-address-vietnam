if (!process.env.NO_LOAD_ENV_FILE) {
  const dotenv = require('dotenv')
  dotenv.config({ encoding: 'utf-8' })
}
