import { ERRORS } from '../constants/errors.js'
import { Logger } from '../utils/Logger.js'

export class AdminController {
  constructor ({ userModel, bookModel, bookfileModel }) {
    this.userModel = userModel
    this.bookModel = bookModel
    this.bookfileModel = bookfileModel
    this.logger = new Logger('AdminController')

    this.logger.log('Creating the AdminController..')
  }

  deleteUser = async (req, res) => {
    this.logger.log('Deleting..')

    const { email = '' } = req.body

    try {
      if (!email) {
        const result = await this.userModel.deleteAllUsers()
        res.json(result)
      } else {
        const result = await this.userModel.deleteUser({ email })
        res.json(result)
      }
    } catch (err) {
      this.logger.log('Error: ' + err)
      return err === ERRORS.userManaging.emailNoExists
        ? res.status(400).json({ message: err })
        : res.status(500).json({ message: ERRORS.unknown })
    }
  }

  deleteBook = async (req, res) => {
    this.logger.log('Deleting..')

    const { userid = '', bookid = '' } = req.body

    try {
      if (!userid && !bookid) {
        const result = await this.bookModel.deleteAllBooks()
        res.json(result)
      } else {
        const result = await this.bookModel.deleteBook({ bookid, userid })
        res.json(result)
      }
    } catch (err) {
      this.logger.log('Error: ' + err)
      return err === ERRORS.book.bookNotFound
        ? res.status(400).json({ message: err })
        : res.status(500).json({ message: ERRORS.unknown })
    }
  }

  deleteBookFile = async (req, res) => {
    this.logger.log('Deleting..')

    const { fileid = '' } = req.body

    try {
      if (!fileid) {
        const result = await this.bookfileModel.deleteAllBooks()
        res.json(result)
      } else {
        const result = await this.bookfileModel.deleteBook({ fileid })
        res.json(result)
      }
    } catch (err) {
      this.logger.log('Error: ' + err)
      return err === ERRORS.book.bookNotFound
        ? res.status(400).json({ message: err })
        : res.status(500).json({ message: ERRORS.unknown })
    }
  }

  deleteSharedBook = async (req, res) => {
    this.logger.log('Deleting..')

    try {
      const result = await this.bookModel.deleteAllSharedBooks()
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json({ message: ERRORS.unknown })
    }
  }

  getAllUsers = async (req, res) => {
    this.logger.log('Getting all the users..')

    try {
      const result = await this.userModel.getAllUsers()
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json({ message: ERRORS.unknown })
    }
  }

  getAllBooks = async (req, res) => {
    this.logger.log('Getting all the books..')

    try {
      const result = await this.bookModel.getAllBooks({})
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json({ message: ERRORS.unknown })
    }
  }

  getAllBookFiles = async (req, res) => {
    this.logger.log('Getting all the book files..')

    try {
      const result = await this.bookfileModel.getAllBooks()
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json({ message: ERRORS.unknown })
    }
  }

  getAllSharedBooks = async (req, res) => {
    this.logger.log('Getting all the shared books..')

    try {
      const result = await this.bookModel.getAllSharedBooks()
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json({ message: ERRORS.unknown })
    }
  }
}
