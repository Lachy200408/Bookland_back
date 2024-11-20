import { createClient } from '../config/postgres-config.js'
import { UserController } from '../controllers/user-controller.js'
import { UserModel } from '../models/user-model.js'
import { createUserRouter } from '../routes/user-router.js'
import { Logger } from '../utils/Logger.js'

export const userConfig = async () => {
  const logger = new Logger('User')
  logger.log('Creating the user config..')

  const client = await createClient()
  const userModel = new UserModel({ client })
  const controller = new UserController({ model: userModel })

  logger.log('User API has been enabled.').endl()

  return createUserRouter({ controller })
}
