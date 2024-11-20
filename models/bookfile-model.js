import crypto from 'node:crypto'
import { Logger } from '../utils/Logger.js'

export class BookfileModel {
  constructor ({ client }) {
    this.logger = new Logger('BookfileModel')
    this.client = client

    this.logger.log('Creating the BookfileModel..')
  }

  async uploadBook ({ mimeType, name, buffer }) {
    this.logger.log('Uploading a book..')

    const fileid = crypto.randomUUID()

    const result = await this.client.query('INSERT INTO bookfiles (fileid, filename, filetype, binarydata) VALUES ($1, $2, $3, $4) RETURNING fileid, filename', [fileid, name, mimeType, buffer])

    return result.rows[0]
  }

  async deleteBook ({ fileid }) {
    this.logger.log('Deleting a book..')

    const result = await this.client.query('DELETE FROM bookfiles WHERE fileid = $1 RETURNING (fileid, filename)', [fileid])

    return result.rows
  }

  async deleteAllBooks () {
    this.logger.log('Deleting all the books..')

    const result = await this.client.query('DELETE FROM bookfiles RETURNING fileid, filename')

    return result.rows
  }

  async getAllBooks () {
    this.logger.log('Getting all the books..')

    const result = await this.client.query('SELECT * FROM bookfiles')

    return result.rows
  }

  async getBookById ({ fileid }) {
    this.logger.log('Getting a book by id..')

    const result = await this.client.query('SELECT * FROM bookfiles WHERE fileid = $1', [fileid])

    return result.rows[0]
  }
}
