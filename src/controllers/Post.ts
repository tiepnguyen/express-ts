import { Request, Response } from 'express'
import Database from '../libs/database'

export default class Post {
  async main(req: Request, res: Response, next: any) {
    try {
      let db = new Database({
        host: 'localhost',
        user: 'root',
        database: 'test',
      })
      /*
      let result = await db.select(
        'id, name, created_time, updated_time',
        'user',
        [{ id: 1 }, 'created_time < NOW()'],
        'id ASC',
        [5, 10],
      )
      result.forEach((item: any) => {
        console.log(item)
      })
      */
      // let result = await db.insert('user', { id: 3, name: 'John', last_login: new Date() }, true)
      // let result = await db.update('user', ['last_login = 1', 'name = "2"'], { last_login: new Date() })
      let result = await db.delete('user', { id: 4, name: 'JSON' })
      console.log(result)
    } catch (error) {
      return next(error)
    }

    const body = 'post'
    res.render('main', { body })
  }
}
