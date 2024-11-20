// import { ERRORS } from '../constants/errors.js'
import { ERRORS } from '../constants/errors.js'
import { Logger } from '../utils/Logger.js'
import { deleteAccents } from '../utils/purgeStrings.js'

export class BookfileController {
  constructor ({ model }) {
    this.model = model
    this.logger = new Logger('BookfileController')

    this.logger.log('Creating the BookfileController..')
  }

  upload = async (req, res) => {
    this.logger.log('Uploading..')

    const { mimeType, name, buffer } = req.file
    this.logger.log(JSON.stringify({
      mimeType,
      name,
      buffer: buffer.length
    }))

    try {
      const result = await this.model.uploadBook({ name, mimeType, buffer })
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json(ERRORS.unknown)
    }
  }

  getFileById = async (req, res) => {
    this.logger.log('Getting a file by id..')

    const { id: fileid } = req.params

    try {
      const result = await this.model.getBookById({ fileid })
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json(ERRORS.unknown)
    }
  }

  getBinaryFile = async (req, res) => {
    this.logger.log('Getting a binary file..')

    const { id: fileid } = req.params

    try {
      const result = await this.model.getBookById({ fileid })

      const buffer = Buffer.from(result.binarydata)

      const filename = deleteAccents(result.filename)

      res.setHeader('Content-Type', result.filetype + '; charset=utf-8')
      res.setHeader('book-name', filename)
      res.send(buffer)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return res.status(500).json(ERRORS.unknown)
    }
  }

  deleteFile = async (req, res) => {
    this.logger.log('Deleting..')

    const { id: fileid } = req.params

    try {
      const result = await this.model.deleteBook({ fileid })
      res.json(result)
    } catch (err) {
      this.logger.log('Error: ' + err)
      return err === ERRORS.book.bookNotFound
        ? res.status(404).json({ message: err })
        : res.status(500).json({ message: ERRORS.unknown })
    }
  }
}
