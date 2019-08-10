import Express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import helmet from 'helmet'

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
require('./libs/load-env')

/**
 * Create Express server.
 */
const app = Express()
app.set('port', process.env.PORT || 4000)
app.set('env', process.env.NODE_ENV || 'development')

/**
 * Express configuration.
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())
app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(compression())

app.all('/*', (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*') // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key')
  if (req.method === 'OPTIONS') {
    res.status(STATUS_OK).send('OKIE !')
  } else {
    next()
  }
})

// router APIs
app.use('/', require('./routes'))

// If no route is matched by now, it must be a 404
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = STATUS_NOT_FOUND
  responseError(res, STATUS_NOT_FOUND, 'not_found', 'error.not_found')
  next(err)
})

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('\x1b[35m %s', `Server listening on https://localhost:${app.get('port')} in ${app.get('env')} environment`)
})

module.exports = app
