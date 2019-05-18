import { Request, Response } from 'express'

export default class ServerError {
  main(req: Request, res: Response) {
    throw new Error('Sample Server Error')
  }
}
