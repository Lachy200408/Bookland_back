import { BookController } from '../controllers/book-controller.js'
import { BookModel } from '../models/book-model.js'
import { createBookRouter } from '../routes/book-router.js'
import { Logger } from '../utils/Logger.js'
import { createClient } from './postgres-config.js'

export const bookConfig = async () => {
  const logger = new Logger('Book')
  logger.log('Creating the Book config..')

  const client = await createClient()
  const bookModel = new BookModel({ client })
  const controller = new BookController({ model: bookModel })

  logger.log('Book API has been enabled.').endl()

  return createBookRouter({ controller })
}
