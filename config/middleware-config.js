import cookieParser from 'cookie-parser'
import express from 'express'
import { corsMiddleware } from '../middlewares/cors-middleware.js'
import { loggerMiddleware } from '../middlewares/logger-middleware.js'
import { optionsMiddleware } from '../middlewares/options-middleware.js'

export const middlewareConfig = ({ app }) => {
  app.use(express.json())
  app.use(corsMiddleware)
  app.use(cookieParser())
  app.use(loggerMiddleware)
  app.use(optionsMiddleware)
}
