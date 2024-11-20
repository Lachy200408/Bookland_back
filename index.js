import express from 'express'
import { adminConfig } from './config/admin-config.js'
import { authConfig } from './config/auth-config.js'
import { bookConfig } from './config/book-config.js'
import { bookfileConfig } from './config/bookfile-config.js'
import { PORT } from './config/config.js'
import { middlewareConfig } from './config/middleware-config.js'
import { userConfig } from './config/user-config.js'
import { Logger } from './utils/Logger.js'

const app = express()

middlewareConfig({ app })

app.use('/auth', await authConfig())
app.use('/admin', await adminConfig())
app.use('/book', await bookConfig())
app.use('/bookfile', await bookfileConfig())
app.use('/user', await userConfig())

app.listen(PORT, () => {
  const logger = new Logger('App')
  logger.log(`Server is running on port ${PORT}`)
})
