import { Router } from 'express'
import { jwtMiddleware } from '../middlewares/jwt-middleware.js'
import { updatingUserMiddleware } from '../middlewares/updating-user-middleware.js'

export const createUserRouter = ({ controller }) => {
  const router = Router()

  router.get('/social', jwtMiddleware, controller.getSocialUsers)
  router.get('/:id', controller.getUserById)
  router.patch('/', jwtMiddleware, updatingUserMiddleware, controller.updateUser)

  return router
}
