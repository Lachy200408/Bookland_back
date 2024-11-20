import { ERRORS } from '../constants/errors.js'
import { Logger } from '../utils/Logger.js'

export class BookController {
  constructor ({ model }) {
    this.model = model
    this.logger = new Logger('BookController')

    this.logger.log('Creating the BookController..')
  }

  getAll = async (req, res) => {
    this.logger.log('Getting all..')

    const { userid } = req.session

    try {
      const result = await this.model.getAllBooks({ userid })
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json({ message: ERRORS.unknown })
    }
  }

  getBookById = async (req, res) => {
    this.logger.log('Getting a book by id..')

    const { userid } = req.session
    const { id: bookid } = req.params

    try {
      const result = await this.model.getBookById({ bookid, userid })
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return err === ERRORS.book.noIdMatch
        ? res.status(404).json({ message: err })
        : res.status(500).json({ message: ERRORS.unknown })
    }
  }

  create = async (req, res) => {
    this.logger.log('Creating a book..')

    const { userid } = req.session
    const { title, author, description, fileid } = req.body

    try {
      const result = await this.model.createBook({ title, author, description, userid, fileid })
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json(ERRORS.unknown)
    }
  }

  update = async (req, res) => {
    this.logger.log('Updating a book..')

    try {
      const { userid } = req.session
      const { id: bookid } = req.params
      const { title = '', author = '', description = '' } = req.body
      const result = await this.model.updateBook({ bookid, title, author, description, userid })
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json(ERRORS.unknown)
    }
  }

  delete = async (req, res) => {
    this.logger.log('Deleting a book..')

    try {
      const { userid } = req.session
      const { id: bookid } = req.params
      const result = await this.model.deleteBook({ bookid, userid })
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json(ERRORS.unknown)
    }
  }

  share = async (req, res) => {
    this.logger.log('Sharing..')

    const { userid: ownerid } = req.session
    const { userid, bookid } = req.body

    try {
      const result = await this.model.shareBook({ ownerid, userid, bookid })
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json(ERRORS.unknown)
    }
  }

  getSharedBooks = async (req, res) => {
    this.logger.log('Getting shared books..')

    const { userid } = req.session

    try {
      const result = await this.model.getSharedBooks({ userid })
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json(ERRORS.unknown)
    }
  }

  deleteSharedBook = async (req, res) => {
    this.logger.log('Deleting shared book..')

    const { userid } = req.session
    const { id: bookid } = req.params

    try {
      const result = await this.model.deleteSharedBook({ bookid, userid })
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json(ERRORS.unknown)
    }
  }
}
