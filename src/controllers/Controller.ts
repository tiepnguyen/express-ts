import { Application } from 'express'

export default class Controller {
  constructor(private app: Application) {}

  render(path: string, vars = {}) {
    return this.app.render(path, vars)
  }
}
