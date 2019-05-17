import { Request, Response } from 'express'
import Controller from './Controller'

export default class About extends Controller {
  async main(req: Request, res: Response, next: any) {
    const body = await this.render('about')
    res.render('main', { body })
  }
}
