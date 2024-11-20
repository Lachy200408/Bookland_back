import { CORS_HEADERS } from '../constants/CORS-headers.js'
import { ACCEPTED_ORIGINS } from '../constants/accepted-origins.js'

export const corsMiddleware = (req, res, next) => {
  let origin = req.headers.origin
  origin = ACCEPTED_ORIGINS.includes(origin) ? origin : ACCEPTED_ORIGINS[0]

  res.setHeader(CORS_HEADERS.ORIGIN, origin)
  res.setHeader(CORS_HEADERS.HEADERS, [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Access-Control-Request-Method',
    'Access-Control-REQUEST-HEADERS',
    'Content-Type',
    'Pragma',
    'Cache-Control'
  ].toString())
  res.setHeader(CORS_HEADERS.METHODS, 'GET,POST,PATCH,PUT,DELETE,OPTIONS,HEADER')
  res.setHeader(CORS_HEADERS.CREDENTIALS, 'true')
  res.setHeader(CORS_HEADERS.EXPOSE, 'Authorization, book-name')
  next()
}
