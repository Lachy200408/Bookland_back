import { MIMETYPE_PDF } from '../constants/MIME-types.js'
import { DriveUtil } from './DriveUtil.js'

export class PDF extends DriveUtil {
  constructor (drive) {
    super(drive, MIMETYPE_PDF)
  }

  async upload ({ name, stream, options }) {
    return await this.drive.files.create({
      requestBody: {
        ...options,
        name
      },
      media: {
        body: stream,
        mimeType: this.type
      },

      fields: 'id'
    })
  }
}
