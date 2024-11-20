import jwt from 'jsonwebtoken'
import { DEV_JWT_SECRET, JWT_SECRET, NODE_ENV } from '../config/config.js'
import { ERRORS } from '../constants/errors.js'

export const jwtMiddleware = (req, res, next) => {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(401).json({ message: ERRORS.jwt.noToken })
  }

  try {
    const decoded = jwt.verify(
      token,
      NODE_ENV === 'development' ? DEV_JWT_SECRET : JWT_SECRET
    )
    req.session = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: ERRORS.jwt.invalidToken })
  }
}
