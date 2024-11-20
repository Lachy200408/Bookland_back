import { Router } from 'express'
import { deleteUserMiddleware } from '../middlewares/delete-user-middleware.js'

export const createAdminRouter = ({ controller }) => {
  const router = Router()

  router.get('/user', controller.getAllUsers)
  router.get('/book', controller.getAllBooks)
  router.get('/bookfile', controller.getAllBookFiles)
  router.get('/sharedbook', controller.getAllSharedBooks)
  router.delete('/user', deleteUserMiddleware, controller.deleteUser)
  router.delete('/book', deleteUserMiddleware, controller.deleteBook)
  router.delete('/bookfile', deleteUserMiddleware, controller.deleteBookFile)
  router.delete('/sharedbook', deleteUserMiddleware, controller.deleteSharedBook)

  return router
}
