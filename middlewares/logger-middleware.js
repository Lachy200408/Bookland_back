import { Logger } from '../utils/Logger.js'

export const loggerMiddleware = (req, res, next) => {
  const logger = new Logger('Middleware')
  logger.log('Request: ' + req.method + ' - ' + req.url)
  next()
}
