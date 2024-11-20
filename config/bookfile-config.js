import { BookfileController } from '../controllers/bookfile-controller.js'
import { BookfileModel } from '../models/bookfile-model.js'
import { createBookfileRouter } from '../routes/bookfile-router.js'
import { Logger } from '../utils/Logger.js'
import { createClient } from './postgres-config.js'

export const bookfileConfig = async () => {
  const logger = new Logger('BookfileConfig')
  logger.log('Creating the BookfileConfig..')

  const bookfileClient = await createClient()
  const bookfileModel = new BookfileModel({ client: bookfileClient })
  const bookfileController = new BookfileController({ model: bookfileModel })

  logger.log('Bookfile API has been enabled').endl()
  return createBookfileRouter({ controller: bookfileController })
}
