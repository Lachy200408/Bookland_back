import zod from 'zod'
import { ADMIN_CREDENTIALS } from '../constants/admin-credentials.js'
import { ERRORS } from '../constants/errors.js'

export const deleteUserMiddleware = async (req, res, next) => {
  const emailParser = zod.string({ message: ERRORS.userValidation.email }).email({ message: ERRORS.userValidation.email }).optional()

  const { email = '', token } = req.body

  if (token !== ADMIN_CREDENTIALS.token) return res.status(403).json({ message: ERRORS.permissionDenied })

  if (email) {
    const result = emailParser.safeParse(email)

    if (!result.success) {
      const errorMsg = result.error.issues.map(issue => issue.message)
      return res.status(400).json({ message: errorMsg })
    }
  }

  next()
}
