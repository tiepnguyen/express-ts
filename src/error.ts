import { Request, Response } from 'express'
import logger from './libs/logger'

export default (error: Error, req: Request, res: Response, next: any) => {
  logger.error(
    [error.message, req.ip, `${req.hostname} ${req.method} ${req.path}`, req.header('user-agent')].join(' | '),
  )
  res.status(500).send('Opps... something wrong: ' + error.message)
}
