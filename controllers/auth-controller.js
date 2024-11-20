import jwt from 'jsonwebtoken'
import { DEV_JWT_SECRET, JWT_SECRET, NODE_ENV } from '../config/config.js'
import { ERRORS } from '../constants/errors.js'
import { Logger } from '../utils/Logger.js'

export class AuthController {
  constructor ({ model }) {
    this.model = model
    this.logger = new Logger('AuthController')

    this.logger.log('Creating the AuthController..')
  }

  signup = async (req, res) => {
    this.logger.log('Signing up..')

    const { username = '', email = '', password } = req.body

    this.logger.log(
      'Request body: ' +
        JSON.stringify({
          username,
          email,
          password: password
            .split('')
            .map((char) => '*')
            .join('')
        })
    )

    try {
      const result = await this.model.createUser({ username, email, password })
      const token = jwt.sign(
        { userid: result.userid, email: result.email },
        NODE_ENV === 'development' ? DEV_JWT_SECRET : JWT_SECRET,
        { expiresIn: '2h' }
      )

      return res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: NODE_ENV === 'production',
          maxAge: 2000 * 60 * 60
        })
        .json(result)
    } catch (error) {
      this.logger.log('Error: ' + error)
      const condition =
        error === ERRORS.userManaging.usernameExists ||
        error === ERRORS.userManaging.passwordExists ||
        error === ERRORS.userManaging.emailExists

      return condition
        ? res.status(401).json({ message: error })
        : res.status(500).json({ message: ERRORS.unknown })
    }
  }

  login = async (req, res) => {
    this.logger.log('Logging in..')

    const { username = '', email = '', password } = req.body

    const requestBody = {
      password: password
        .split('')
        .map((char) => '*')
        .join('')
    }
    if (username) requestBody.username = username
    if (email) requestBody.email = email

    this.logger.log('Request body: ' + JSON.stringify(requestBody))

    try {
      const result = await this.model.getUser({ username, email, password })
      const token = jwt.sign(
        { userid: result.userid, email: result.email },
        NODE_ENV === 'development' ? DEV_JWT_SECRET : JWT_SECRET,
        { expiresIn: '2h' }
      )

      return res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: NODE_ENV === 'production',
          maxAge: 2000 * 60 * 60
        })
        .json(result)
    } catch (error) {
      this.logger.log('Error: ' + error)
      return error === ERRORS.userManaging.userNotFound
        ? res.status(404).json({ message: ERRORS.userManaging.userNotFound })
        : res.status(500).json({ message: ERRORS.unknown })
    }
  }

  logout = async (req, res) => {
    this.logger.log('Logging out..')

    return res.clearCookie('access_token').json({ message: ERRORS.userManaging.loggedOut })
  }

  checkToken = async (req, res) => {
    this.logger.log('Checking token..')

    return res.json({ logged: 'true' })
  }
}
