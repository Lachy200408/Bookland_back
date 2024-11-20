import dotenv from 'dotenv'

dotenv.config()

export const {
  PORT,
  NODE_ENV,

  DEV_DB_USER,
  DEV_DB_PASSWORD,
  DEV_DB_NAME,
  DEV_DB_HOST,
  DEV_DB_PORT,

  DEV_JWT_SECRET,
  JWT_SECRET = 'secret',

  DB_USER = 'postgres',
  DB_PASSWORD = 'postgres',
  DB_NAME = 'bookland',
  DB_URL = 'localhost',
  DB_PORT = 5432
} = process.env
