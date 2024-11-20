import pg from 'pg'
import { DB_NAME, DB_PASSWORD, DB_PORT, DB_URL, DB_USER, DEV_DB_HOST, DEV_DB_NAME, DEV_DB_PASSWORD, DEV_DB_PORT, DEV_DB_USER, NODE_ENV } from '../config/config.js'
import { Logger } from '../utils/Logger.js'

export const createClient = async () => {
  const logger = new Logger('Postgres')
  logger.log('Creating the database client..')

  const devConfig = {
    user: DEV_DB_USER,
    password: DEV_DB_PASSWORD,
    database: DEV_DB_NAME,
    host: DEV_DB_HOST,
    port: DEV_DB_PORT
  }
  const prodConfig = {
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    connectionString: DB_URL
  }

  const client = new pg.Client(
    NODE_ENV === 'development' ? devConfig : prodConfig
  )

  try {
    logger.log('Connecting to the database..')
    await client.connect()

    logger.log('Setting up the database..')

    await client.query(
      'CREATE TABLE if not exists users (userid SERIAL PRIMARY KEY, username VARCHAR(20) NOT NULL, email VARCHAR(50) NOT NULL UNIQUE, password VARCHAR(256) NOT NULL, avatarname VARCHAR(100) NOT NULL DEFAULT(\'user\'))'
    )
    await client.query(
      'CREATE TABLE IF NOT EXISTS bookfiles (fileid UUID PRIMARY KEY, filename VARCHAR(500) NOT NULL, filetype VARCHAR(100) NOT NULL, binarydata bytea NOT NULL)'
    )
    await client.query(
      'CREATE TABLE IF NOT EXISTS books (bookid UUID PRIMARY KEY, title VARCHAR(100) NOT NULL, author VARCHAR(100) NOT NULL, description VARCHAR(500) NOT NULL, userid INTEGER REFERENCES users, fileid UUID REFERENCES bookfiles)'
    )
    await client.query(
      'CREATE TABLE IF NOT EXISTS sharedbooks (ownerid INTEGER REFERENCES users, userid INTEGER REFERENCES users, bookid UUID REFERENCES books)'
    )
  } catch (err) {
    throw new Error('Could not connect to database: ' + err)
  }

  return client
}
