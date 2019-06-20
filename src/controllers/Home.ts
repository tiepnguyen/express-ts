import { Request, Response } from 'express'
import Controller from './Controller'

export default class Home extends Controller {
  async main(req: Request, res: Response) {
    const body = await this.render('home')
    res.render('main', { body })
  }
}
