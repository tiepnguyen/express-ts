import { Request, Response } from 'express'

export default class About {
  async main(req: Request, res: Response, next: any) {
    const body = await req.app.render('about')
    res.render('main', { body })
  }
}
