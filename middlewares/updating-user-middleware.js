import { ERRORS } from '../constants/errors.js'

export const updatingUserMiddleware = (req, res, next) => {
  const { username = '', password = '' } = req.body

  if (username) {
    if (username.length < 3) {
      return res.status(400).json({ message: ERRORS.userValidation.usernameMin })
    }
    if (username.length > 20) {
      return res.status(400).json({ message: ERRORS.userValidation.usernameMax })
    }
  }

  if (password) {
    if (password.length < 6) {
      return res.status(400).json({ message: ERRORS.userValidation.passwordMin })
    }
    if (password.length > 20) {
      return res.status(400).json({ message: ERRORS.userValidation.passwordMax })
    }
  }

  next()
}
