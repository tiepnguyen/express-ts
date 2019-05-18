import { Application } from 'express'
import { Logger } from 'winston'

export default class Controller {
  constructor(private app: Application, protected logger: Logger) {}

  render(path: string, vars = {}) {
    return new Promise((resolve, reject) => {
      this.app.render(path, vars, (error, content) => {
        if (error) {
          reject(error)
        } else {
          resolve(content)
        }
      })
    })
  }
}
