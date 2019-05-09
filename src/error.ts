import { Request, Response } from 'express'

export default (error: Error, req: Request, res: Response, next: any) => {
  res.send('Opps... something\'s wrong: ' + error.message)
}
