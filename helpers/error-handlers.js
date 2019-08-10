import { snakeCase } from 'lodash'

export const responseError = (res, statusCode, kind, error) => {
  logger.error(error) // Just for developement
  res.status(statusCode).json({
    status: statusCode,
    message: error,
    message_code: `error.${kind}.${snakeCase(error)}`
  })
}
