import { Router } from 'express'
import { gettingFileMiddleware } from '../middlewares/getting-file-middleware.js'
import { jwtMiddleware } from '../middlewares/jwt-middleware.js'

export const createBookfileRouter = ({ controller }) => {
  const router = Router()

  router.use(jwtMiddleware)
  router.post('/', gettingFileMiddleware, controller.upload)
  router.get('/:id', controller.getFileById)
  router.get('/download/:id', controller.getBinaryFile)

  return router
}
