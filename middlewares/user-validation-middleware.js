import zod from 'zod'
import { ERRORS } from '../constants/errors.js'
import { Logger } from '../utils/Logger.js'

export const userValidationMiddleware = (req, res, next) => {
  const logger = new Logger('UserValidationMiddleware')

  try {
    const { username, email, password } = req.body

    if (!username && !email) throw ERRORS.userValidation.neitherUsernameNorEmail

    const validSchema = zod.object({
      username: zod.string({ message: ERRORS.userValidation.username }).min(3, { message: ERRORS.userValidation.usernameMin }).max(20, { message: ERRORS.userValidation.usernameMax }).optional(),
      email: zod.string({ message: ERRORS.userValidation.email }).email({ message: ERRORS.userValidation.email }).optional(),
      password: zod.string({ message: ERRORS.userValidation.password }).min(6, { message: ERRORS.userValidation.passwordMin }).max(20, { message: ERRORS.userValidation.passwordMax })
    })

    const result = validSchema.safeParse({ username, email, password })

    if (!result.success) {
      const errorMsg = result.error.issues.map(issue => issue.message)
      throw errorMsg
    }

    next()
  } catch (error) {
    logger.log('Error: ' + error)
    res.status(400).json({ message: error })
  }
}
