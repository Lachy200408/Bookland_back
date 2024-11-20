export class Elements {
  constructor (drive) {
    this.drive = drive
  }

  async byId ({ id }) {
    return await this.drive.files.get({
      fileId: id
    })
  }

  async insideIn ({ parentID }) {
    return await this.drive.files.list({
      q: `'${parentID}' in parents`
    })
  }

  async upload ({ name, stream, options, mimeType }) {
    return await this.drive.files.create({
      requestBody: {
        ...options,
        name
      },
      media: {
        body: stream,
        mimeType
      },

      fields: 'id'
    })
  }
}
