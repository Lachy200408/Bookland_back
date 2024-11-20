import crypto from 'node:crypto'
import { ERRORS } from '../constants/errors.js'
import { Logger } from '../utils/Logger.js'

export class BookModel {
  constructor ({ client }) {
    this.client = client
    this.logger = new Logger('BookModel')

    this.logger.log('Creating the BookModel..')
  }

  async getAllBooks ({ userid }) {
    this.logger.log('Getting all books..')

    const query = userid !== undefined ? ['SELECT * FROM books LEFT JOIN (SELECT fileid, filename, filetype FROM bookfiles) USING (fileid) WHERE books.userid = $1', [userid]] : ['SELECT * FROM books LEFT JOIN (SELECT fileid, filename, filetype FROM bookfiles) USING (fileid)']

    const result = await this.client.query(...query)

    return result.rows
  }

  async getBookById ({ bookid, userid }) {
    this.logger.log('Getting a book by id..')

    const result = await this.client.query(
      'SELECT * FROM books LEFT JOIN (SELECT fileid, filename, filetype FROM bookfiles) USING (fileid) WHERE books.bookid = $1 AND books.userid = $2',
      [bookid, userid]
    )

    if (result.rows.length === 0) throw ERRORS.book.noIdMatch

    return result.rows[0]
  }

  async createBook ({ title, author, description, userid, fileid }) {
    this.logger.log('Creating a book..')

    const bookid = crypto.randomUUID()

    const result = await this.client.query(
      'INSERT INTO books (bookid, title, author, description, userid, fileid) VALUES ($1, $2, $3, $4, (select userid from users where userid = $5), (select fileid from bookfiles where fileid = $6)) RETURNING bookid',
      [bookid, title, author, description, userid, fileid]
    )

    return result.rows[0]
  }

  async updateBook ({ bookid, title, author, description, userid }) {
    this.logger.log('Updating a book..')

    const book = await this.getBookById({ bookid, userid })
    if (!book) throw ERRORS.book.bookNotFound

    const [finalTitle, finalAuthor, finalDescription] = [title === '' ? book.title : title, author === '' ? book.author : author, description === '' ? book.description : description]

    const result = await this.client.query(
      'UPDATE books SET title = $1, author = $2, description = $3 WHERE bookid = $4 and userid = $5 RETURNING bookid',
      [finalTitle, finalAuthor, finalDescription, bookid, userid]
    )

    return result.rows[0]
  }

  async deleteBook ({ bookid, userid }) {
    this.logger.log('Deleting a book..')

    const result = await this.client.query(
      'DELETE FROM books WHERE bookid = $1 AND userid = $2 RETURNING bookid',
      [bookid, userid]
    )

    return result.rows[0]
  }

  async deleteAllBooks () {
    this.logger.log('Deleting all the books..')

    const result = await this.client.query(
      'DELETE FROM books'
    )

    return result.rows
  }

  async shareBook ({ ownerid, userid, bookid }) {
    this.logger.log('Sharing a book..')

    const result = await this.client.query(
      'INSERT INTO sharedbooks (ownerid, userid, bookid) VALUES ((select userid AS ownerid from users where userid = $1), (select userid from users where userid = $2), (select bookid from books where bookid = $3)) RETURNING bookid',
      [ownerid, userid, bookid]
    )

    return result.rows[0]
  }

  async getAllSharedBooks () {
    this.logger.log('Getting all shared books..')

    const result = await this.client.query(
      'SELECT * FROM sharedbooks'
    )

    return result.rows
  }

  async getSharedBooks ({ userid }) {
    this.logger.log('Getting shared books..')

    const result = await this.client.query(
      'SELECT * FROM sharedbooks LEFT JOIN (SELECT bookid, title, author, description, fileid, filename, filetype FROM books LEFT JOIN (SELECT fileid, filename, filetype FROM bookfiles) USING (fileid)) USING (bookid) WHERE sharedbooks.userid = $1',
      [userid]
    )

    return result.rows
  }

  async deleteSharedBook ({ bookid, userid }) {
    this.logger.log('Deleting shared book..')

    const result = await this.client.query(
      'DELETE FROM sharedbooks WHERE bookid = $1 AND userid = $2 RETURNING bookid',
      [bookid, userid]
    )

    return result.rows[0]
  }

  async deleteAllSharedBooks () {
    this.logger.log('Deleting all shared books..')

    const result = await this.client.query(
      'DELETE FROM sharedbooks'
    )

    return result.rows
  }
}
