export class DriveUtil {
  constructor (_drive, _type) {
    this.drive = _drive
    this.type = _type
  }

  async insideIn ({ parentID }) {
    return await this.drive.files.list({
      q: `mimeType='${this.type}' and '${parentID}' in parents`,
      fields: 'files(id,name,createdTime,modifiedTime,exportLinks,size)'
    })
  }
}
