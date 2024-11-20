import bcrypt from 'bcrypt'
import { ERRORS } from '../constants/errors.js'
import { Logger } from '../utils/Logger.js'

export class UserModel {
  constructor ({ client }) {
    this.client = client
    this.logger = new Logger('UserModel')

    this.logger.log('Creating the UserModel..')
  }

  async createUser ({ username, email, password }) {
    this.logger.log('Creating a new user..')

    if (await this.checkUserByUsername({ username })) { throw ERRORS.userManaging.usernameExists }
    if (await this.checkUserByEmail({ email })) { throw ERRORS.userManaging.emailExists }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await this.client.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING userid, username, email',
      [username, email, hashedPassword]
    )

    return result.rows[0]
  }

  async getUser ({ username, email, password }) {
    this.logger.log('Getting a user..')

    const queryString = username && email
      ? 'SELECT * FROM users WHERE username = $1 AND email = $2'
      : username && !email
        ? 'SELECT * FROM users WHERE username = $1'
        : 'SELECT * FROM users WHERE email = $1'

    const dependencies = username && email
      ? [username, email]
      : username && !email
        ? [username]
        : [email]

    const result = await this.client.query(queryString, dependencies)

    if (!result.rows[0]) { throw ERRORS.userManaging.userNotFound }

    const { password: hashedPassword } = result.rows[0]
    const passwordMatch = await bcrypt.compare(password, hashedPassword)
    if (!passwordMatch) { throw ERRORS.userManaging.passwordNoExists }

    const { password: _, ...user } = result.rows[0]

    return user
  }

  async getUserById ({ userid }) {
    this.logger.log(`Getting the user with id: ${userid}..`)

    const result = await this.client.query('select * from users where userid = $1', [userid])

    if (!result.rows[0]) { throw ERRORS.userManaging.userNotFound }

    const { password: _, ...user } = result.rows[0]

    return user
  }

  async checkUserById ({ userid }) {
    this.logger.log(`Checking if the user with id: ${userid} exists..`)

    const result = await this.client.query(
      'select exists( select * from users where userid = $1)',
      [userid]
    )

    return result.rows[0].exists
  }

  async checkUserByUsername ({ username }) {
    this.logger.log(`Checking if the user with username: ${username} exists..`)

    const result = await this.client.query(
      'select exists( select * from users where username = $1)',
      [username]
    )

    return result.rows[0].exists
  }

  async checkUserByEmail ({ email }) {
    this.logger.log(`Checking if the user with email: ${email} exists..`)

    const result = await this.client.query(
      'select exists( select * from users where email = $1)',
      [email]
    )

    return result.rows[0].exists
  }

  async getAllUsers () {
    this.logger.log('Getting all the users..')

    const result = await this.client.query('select * from users')

    return result.rows
  }

  async updateUser ({ userid, username, password, avatarname }) {
    this.logger.log(`Updating the user with id: ${userid}..`)

    if (!await this.checkUserById({ userid })) { throw ERRORS.userManaging.userNotFound }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null

    let posNumber = 1
    const queryArray = ['UPDATE users SET ', '', ' WHERE userid = $', '', ' RETURNING username, email, avatarname']

    if (username) {
      queryArray[1] += `username=$${posNumber}`
      posNumber++
    }

    if (password) {
      queryArray[1] += `${posNumber > 1 ? ', ' : ''}password=$${posNumber}`
      posNumber++
    }

    if (avatarname) {
      queryArray[1] += `${posNumber > 1 ? ', ' : ''}avatarname=$${posNumber}`
      posNumber++
    }

    queryArray[3] = posNumber.toString()

    const dependencies = [userid]

    if (avatarname) {
      dependencies.unshift(avatarname)
    }

    if (password) {
      dependencies.unshift(hashedPassword)
    }

    if (username) {
      dependencies.unshift(username)
    }

    const result = await this.client.query(queryArray.join(''), dependencies)

    return result.rows[0]
  }

  async deleteAllUsers () {
    this.logger.log('Deleting all the users..')

    const result = await this.client.query('delete from users')

    return result.rows
  }

  async deleteUser ({ email }) {
    this.logger.log(`Deleting the user with email: ${email}`)

    if (!await this.checkUserByEmail({ email })) { throw ERRORS.userManaging.emailNoExists }
    const result = await this.client.query('delete from users where email = $1', [email])

    return result.rows
  }
}
