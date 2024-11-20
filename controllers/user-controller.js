import { Logger } from '../utils/Logger.js'

export class UserController {
  constructor ({ model }) {
    this.model = model
    this.logger = new Logger('UserController')

    this.logger.log('Creating the UserController..')
  }

  getUserById = async (req, res) => {
    const { id: userid } = req.params
    try {
      const result = await this.model.getUserById({ userid })
      return res.json(result)
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  updateUser = async (req, res) => {
    const { userid } = req.session
    const { username, password, avatarname } = req.body

    try {
      const result = await this.model.updateUser({ userid, username, password, avatarname })
      return res.json(result)
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  getSocialUsers = async (req, res) => {
    const { userid } = req.session

    try {
      const result = await this.model.getAllUsers()
      const filteredResult = result.filter((user) => user.userid !== userid)
      const _result = filteredResult.map((user) => {
        const { email, password, ...rest } = user
        return rest
      })

      return res.json(_result)
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
}
