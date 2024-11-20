import zod from 'zod'
import { ERRORS } from '../constants/errors.js'

export const shareValidationMiddleware = (req, res, next) => {
  const { userid, bookid } = req.body
  const schema = zod.object({
    userid: zod.number().positive(),
    bookid: zod.string().uuid({ message: ERRORS.bookValidation.bookIdNotUUID })
  })

  if (!userid || !bookid) {
    return res.status(400).json({ message: 'Missing parameters: userid or bookid' })
  }

  const result = schema.safeParse({ userid, bookid })

  if (!result.success) {
    return res.status(400).json({ message: result.error.message })
  }

  next()
}
