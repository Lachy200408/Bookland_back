import { Router } from 'express'
import { bookValidationMiddleware } from '../middlewares/book-validation-middleware.js'
import { jwtMiddleware } from '../middlewares/jwt-middleware.js'
import { shareValidationMiddleware } from '../middlewares/share-validation-middleware.js'

export const createBookRouter = ({ controller }) => {
  const router = Router()

  router.use(jwtMiddleware)
  router.get('/', controller.getAll)
  router.get('/share', controller.getSharedBooks)
  router.get('/:id', controller.getBookById)
  router.post('/', bookValidationMiddleware, controller.create)
  router.post('/share', shareValidationMiddleware, controller.share)
  router.patch('/:id', controller.update)
  router.delete('/share/:id', controller.deleteSharedBook)
  router.delete('/:id', controller.delete)

  return router
}
