import { Request, Response } from 'express'

export default class NotFound {
  main(req: Request, res: Response) {
    res.render('404')
  }
}
