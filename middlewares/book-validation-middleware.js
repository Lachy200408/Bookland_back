import { ERRORS } from '../constants/errors.js'

export const bookValidationMiddleware = (req, res, next) => {
  const { title = '', fileid = '' } = req.body

  if (!title) return res.status(400).json({ message: ERRORS.bookValidation.noTitle })
  if (title.length < 3) return res.status(400).json({ message: ERRORS.bookValidation.titleMin })
  if (title.length > 100) return res.status(400).json({ message: ERRORS.bookValidation.titleMax })
  if (!fileid) return res.status(400).json({ message: ERRORS.bookValidation.fileid })

  next()
}
