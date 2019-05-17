import { Request, Response } from 'express'
import Controller from './Controller'

export default class Home extends Controller {
  async main(req: Request, res: Response, next: any) {
    let body = await this.render('home')
    let view = await this.render('main', { body })
    res.send(view)
    // res.render('main', { body })
  }
}
