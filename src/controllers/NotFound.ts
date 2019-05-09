import { Request, Response } from 'express'

export default class NotFound {
  main(req: Request, res: Response) {
    res.status(404).render('404')
  }
}
