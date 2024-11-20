import { Router } from 'express'
import { jwtMiddleware } from '../middlewares/jwt-middleware.js'
import { userValidationMiddleware } from '../middlewares/user-validation-middleware.js'

export const createAuthRouter = ({ controller }) => {
  const router = Router()

  router.post('/logout', controller.logout)
  router.post('/login', userValidationMiddleware, controller.login)
  router.post('/signup', userValidationMiddleware, controller.signup)
  router.get('/token', jwtMiddleware, controller.checkToken)

  return router
}
