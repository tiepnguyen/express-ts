import { Request, Response } from 'express'

export default (error: Error, req: Request, res: Response, next: any) => {
  res.status(500).send('Opps... something wrong: ' + error.message)
}
