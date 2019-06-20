import { Request, Response } from 'express'
import Database from '../libs/database'

export default class Post {
  async main(req: Request, res: Response, next: any) {
    try {
      const db = new Database({
        host: 'localhost',
        user: 'root',
        database: 'test',
      })

      const result = await db.select(
        `id, name, JSON_EXTRACT(data, '$.data.bool') as data, status, created_time, updated_time`,
        'user',
        {
          id: 2,
        },
      )
      result.forEach((item: any) => {
        Object.entries(item).forEach(([key, value]) => {
          console.log(typeof value, key, '=', value)
        })
      })

      // let result = await db.insert('user', { id: 3, name: 'John', last_login: new Date() }, true)
      // let result = await db.update('user', ['last_login = 1', 'name = "2"'], { last_login: new Date() })
      // let result = await db.delete('user', { id: 4, name: 'JSON' })
      // console.log(result)
    } catch (error) {
      return next(error)
    }

    const body = 'post'
    res.render('main', { body })
  }
}
