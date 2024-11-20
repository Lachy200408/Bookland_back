import { createClient } from '../config/postgres-config.js'
import { AuthController } from '../controllers/auth-controller.js'
import { UserModel } from '../models/user-model.js'
import { createAuthRouter } from '../routes/auth-router.js'
import { Logger } from '../utils/Logger.js'

export const authConfig = async () => {
  const logger = new Logger('Auth')
  logger.log('Creating the auth config..')

  const client = await createClient()
  const userModel = new UserModel({ client })
  const controller = new AuthController({ model: userModel })

  logger.log('Auth API has been enabled.').endl()

  return createAuthRouter({ controller })
}
