import { Request, Response } from 'express'

export default class Home {
  async main(req: Request, res: Response, next: any) {
    let body = await req.app.render('home')
    res.render('main', { body })
  }
}
