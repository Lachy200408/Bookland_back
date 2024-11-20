import { createClient } from '../config/postgres-config.js'
import { AdminController } from '../controllers/admin-controller.js'
import { BookModel } from '../models/book-model.js'
import { BookfileModel } from '../models/bookfile-model.js'
import { UserModel } from '../models/user-model.js'
import { createAdminRouter } from '../routes/admin-router.js'
import { Logger } from '../utils/Logger.js'

export const adminConfig = async () => {
  const logger = new Logger('Admin')
  logger.log('Creating the Admin config..')

  const client = await createClient()
  const userModel = new UserModel({ client })
  const bookModel = new BookModel({ client })
  const bookfileModel = new BookfileModel({ client })
  const controller = new AdminController({ userModel, bookModel, bookfileModel })

  logger.log('Admin API has been enabled.').endl()

  return createAdminRouter({ controller })
}
