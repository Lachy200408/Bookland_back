import { ERRORS } from '../constants/errors.js'
import { Logger } from '../utils/Logger.js'

export const gettingFileMiddleware = (req, res, next) => {
  const logger = new Logger('GettingFileMiddleware')
  const mimeType = req.get('content-type')
  const { name = '' } = req.query

  if (!mimeType) return res.status(400).json({ message: ERRORS.file.noMIMETypeProvided })
  if (!name) return res.status(400).json({ message: ERRORS.file.noNameProvided })

  const body = []

  if (req.body) {
    logger.log('Getting file from body..')

    req.on('data', chunk => {
      body.push(...Int8Array.from(chunk))
    })

    req.on('end', () => {
      logger.log('File received..')

      req.file = {
        mimeType,
        name,
        buffer: Buffer.from(body)
      }

      next()
    })
  } else {
    return res.status(400).json({ message: ERRORS.file.noFileProvided })
  }
}
