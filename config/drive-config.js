import { google } from 'googleapis'
import { Logger } from '../utils/Logger.js'
import { DIRVE_TOKEN_URI, DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET, DRIVE_PROJECT_ID, DRIVE_REFRESH_TOKEN, DRIVE_TYPE } from './config.js'

export const driveConfig = async () => {
  const logger = new Logger('DriveConfig')
  logger.log('Creating the DriveConfig..')

  const credentials = {
    project_id: DRIVE_PROJECT_ID,
    type: DRIVE_TYPE,
    client_id: DRIVE_CLIENT_ID,
    client_secret: DRIVE_CLIENT_SECRET,
    token_uri: DIRVE_TOKEN_URI,
    refresh_token: DRIVE_REFRESH_TOKEN
  }

  //! Arreglar el cliente de drive

  const drive = google.drive({ version: 'v3', auth: credentials })

  logger.log('Drive client has been enabled')

  // await drive.files.list({
  //   fields: 'id'
  // })

  return drive
}
