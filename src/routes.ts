import { Router, Application } from 'express'
import logger from './libs/logger'
import Home from './controllers/Home'
import About from './controllers/About'
import NotFound from './controllers/NotFound'
import Post from './controllers/Post'
import ServerError from './controllers/ServerError'

const router = Router()
const routes: Route[] = [
  {
    path: '/about',
    controller: About,
  },
  {
    path: '/post',
    controller: Post,
  },
  {
    path: '/error',
    controller: ServerError,
  },
  {
    path: '/',
    controller: Home,
  },
  {
    path: '*',
    controller: NotFound,
  },
]

export default (app: Application) => {
  routes.map((route: Route) => {
    const controller = new route.controller(app, logger)
    controller.db = 'doo'
    router.all(route.path, (req, res, next) => controller.main(req, res, next))
  })

  return router
}
