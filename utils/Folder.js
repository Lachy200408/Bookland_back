import { MIMETYPE_FOLDER } from '../constants/MIME-types.js'
import { DriveUtil } from './DriveUtil.js'

export class Folder extends DriveUtil {
  constructor (drive) {
    super(drive, MIMETYPE_FOLDER)
  }

  async create ({ name, options }) {
    return await this.drive.files.create({
      requestBody: {
        ...options,
        name,
        mimeType: this.type
      },
      fields: 'id'
    })
  }

  async byName ({ name, parent }) {
    return await this.drive.files.list({
      q: `mimeType='${this.type}' and name='${name}' ${parent ? `and '${parent}' in parents` : ''}`
    })
  }

  async exist ({ name, parent }) {
    const {
      data: { files }
    } = await this.byName({ name, parent })

    if (!files.length) return ''
    else return files[0].id
  }

  async delete ({ id }) {
    return await this.drive.files.update({
      fileId: id,
      requestBody: {
        trashed: true
      }
    })
  }
}
