export class Logger {
  constructor (name) {
    this.name = name
  }

  log (message) {
    console.log(`[${this.name}] - ${message}.`)

    return {
      endl: () => console.log(`[${this.name}] - End.\n`)
    }
  }
}
